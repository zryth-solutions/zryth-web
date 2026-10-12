/**
 * The chat demo as a pure function. Given how far the scripted opening has
 * played, what the user has chosen, and how far the simulated action run has
 * played, it returns everything on screen. A failed action can never produce a
 * success state: the two branches never share a step status.
 */

export type Scenario = "normal" | "outage";
export type Choice = "replacement" | "refund";
export type Flow = { scenario: Scenario; choice: Choice | null; confirmed: boolean };
export type StepStatus = "idle" | "running" | "done" | "failed";
export type Phase = "intro" | "offer" | "confirm" | "executing" | "success" | "failed";

export type Message = { id: string; from: "customer" | "agent"; text: string };
export type Step = { id: string; label: string; status: StepStatus; detail: string };

export type ChatScript = {
  order: { id: string; item: string; total: number; deliveredDaysAgo: number; stockBefore: number };
  policy: { windowDays: number; text: string };
  ticketId: string;
  intro: {
    msgReport: number;
    typingAsk: readonly [number, number];
    msgAsk: number;
    msgOrderNumber: number;
    lookupStart: number;
    lookupDone: number;
    policyDone: number;
    typingOffer: readonly [number, number];
    msgOffer: number;
  };
  exec: {
    submitDone: number;
    ticketDone: number;
    notifyDone: number;
    typingReply: readonly [number, number];
    msgReply: number;
  };
  text: Record<string, string>;
  stepLabels: string[];
};

export type View = {
  phase: Phase;
  messages: Message[];
  typing: "agent" | null;
  actions: "options" | "confirm" | null;
  steps: Step[];
  order: { loaded: boolean; status: string; resolution: string; stock: string; note: string | null };
  ticket: { id: string; status: string } | null;
  notification: string | null;
  history: string[];
  handoff: null | {
    ticketId: string;
    failedAction: string;
    order: string;
    error: string;
    failedStep: string;
    customerChoice: string;
    conversation: { from: "customer" | "agent"; text: string }[];
  };
  /** Number of workflow steps completed; a failed step does not count. */
  workflowIndex: number;
  outcome: string | null;
};

const money = (n: number) => `$${n.toFixed(2)}`;
const choiceLabel = (c: Choice) => (c === "replacement" ? "replacement" : "refund");

export function chatView(script: ChatScript, introMs: number, flow: Flow, execMs: number): View {
  const { intro: I, exec: X, text: T, order, policy } = script;
  const { choice, confirmed, scenario } = flow;
  const outage = scenario === "outage";

  const messages: Message[] = [];
  const push = (id: string, from: Message["from"], text: string) => messages.push({ id, from, text });

  if (introMs >= I.msgReport) push("report", "customer", T.report);
  if (introMs >= I.msgAsk) push("ask", "agent", T.ask);
  if (introMs >= I.msgOrderNumber) push("orderNumber", "customer", T.orderNumber);
  const offered = introMs >= I.msgOffer;
  if (offered) push("offer", "agent", T.offer);

  if (offered && choice) {
    push("choice", "customer", choice === "replacement" ? T.replacementChoice : T.refundChoice);
    push("confirmAsk", "agent", choice === "replacement" ? T.confirmReplacement : T.confirmRefund);
  }
  if (offered && choice && confirmed) push("confirmed", "customer", T.confirmed);

  const runDone = Boolean(offered && choice && confirmed && execMs >= X.msgReply);
  if (runDone) {
    push("reply", "agent", outage ? T.failed : choice === "replacement" ? T.doneReplacement : T.doneRefund);
  }

  const running = Boolean(offered && choice && confirmed);
  const typing: View["typing"] =
    (introMs >= I.typingAsk[0] && introMs < I.typingAsk[1]) ||
    (introMs >= I.typingOffer[0] && introMs < I.typingOffer[1]) ||
    (running && execMs >= X.typingReply[0] && execMs < X.typingReply[1])
      ? "agent"
      : null;

  let phase: Phase;
  if (!offered) phase = "intro";
  else if (!choice) phase = "offer";
  else if (!confirmed) phase = "confirm";
  else if (!runDone) phase = "executing";
  else phase = outage ? "failed" : "success";

  const actions: View["actions"] = phase === "offer" ? "options" : phase === "confirm" ? "confirm" : null;

  // Backend steps.
  const retrieved = introMs >= I.lookupDone;
  const checked = introMs >= I.policyDone;
  const submitDone = running && execMs >= X.submitDone;
  const ticketDone = running && execMs >= X.ticketDone;
  const notifyDone = running && execMs >= X.notifyDone;
  const labels = script.stepLabels;

  const steps: Step[] = [
    {
      id: "retrieve",
      label: labels[0],
      status: retrieved ? "done" : introMs >= I.lookupStart ? "running" : "idle",
      detail: retrieved
        ? `Order ${order.id}: ${order.item}, ${money(order.total)}, delivered ${order.deliveredDaysAgo} days ago.`
        : introMs >= I.lookupStart
          ? `Looking up ${order.id}…`
          : "Waiting for an order number.",
    },
    {
      id: "policy",
      label: labels[1],
      status: checked ? "done" : retrieved ? "running" : "idle",
      detail: checked
        ? `${order.deliveredDaysAgo} days is inside the ${policy.windowDays}-day window: eligible. Replacement stock available (${order.stockBefore}).`
        : retrieved
          ? "Checking the returns policy…"
          : "Waiting for the order.",
    },
    {
      id: "confirm",
      label: labels[2],
      status: confirmed && choice ? "done" : choice ? "running" : "idle",
      detail:
        confirmed && choice
          ? `Customer confirmed the ${choiceLabel(choice)}.`
          : choice
            ? "Asked the customer to confirm before doing anything."
            : "Asked after the customer picks an option.",
    },
    {
      id: "submit",
      label: labels[3],
      status: !running ? "idle" : submitDone ? (outage ? "failed" : "done") : "running",
      detail: !running
        ? "Runs only after confirmation."
        : submitDone
          ? outage
            ? "Order system unavailable (simulated outage). Nothing was changed."
            : choice === "replacement"
              ? `Replacement for ${order.id} submitted.`
              : `Refund of ${money(order.total)} for ${order.id} submitted.`
          : "Submitting to the order system…",
    },
    {
      id: "ticket",
      label: labels[4],
      status: !running || !submitDone ? "idle" : ticketDone ? "done" : "running",
      detail: !running || !submitDone
        ? outage
          ? "If an action fails, the ticket goes to a human."
          : "Updated once the action succeeds."
        : outage
          ? ticketDone
            ? `${script.ticketId} handed to a human with the conversation and failed-action context.`
            : "Handing the ticket to a human…"
          : ticketDone
            ? `${script.ticketId} marked resolved.`
            : "Updating the ticket…",
    },
    {
      id: "notify",
      label: labels[5],
      status: !running || !ticketDone ? "idle" : notifyDone ? "done" : "running",
      detail: !running || !ticketDone
        ? "Sent last."
        : notifyDone
          ? outage
            ? "Customer told a teammate will follow up (sample email)."
            : "Confirmation emailed to the customer (sample email)."
          : "Sending…",
    },
  ];

  // Records.
  const orderView: View["order"] = {
    loaded: retrieved,
    status: "Delivered · damage reported",
    resolution: "None yet",
    stock: `${order.stockBefore} in stock`,
    note: null,
  };
  if (submitDone && !outage && choice === "replacement") {
    orderView.status = "Replacement ordered";
    orderView.resolution = `Replacement for ${order.id} dispatched`;
    orderView.stock = `${order.stockBefore - 1} in stock`;
  } else if (submitDone && !outage && choice === "refund") {
    orderView.status = "Refund submitted";
    orderView.resolution = `${money(order.total)} to the original payment method`;
  } else if (submitDone && outage) {
    orderView.note = "Last action failed (simulated outage). Record unchanged.";
  }

  let ticket: View["ticket"] = null;
  if (introMs >= I.msgReport) {
    ticket = { id: script.ticketId, status: "Open" };
    if (running && submitDone && !ticketDone) ticket.status = "Updating…";
    if (ticketDone) ticket.status = outage ? "Escalated to human" : "Resolved";
  }

  const notification = notifyDone
    ? outage
      ? "Handoff notice emailed (sample)"
      : `${choice === "replacement" ? "Replacement" : "Refund"} confirmation emailed (sample)`
    : null;

  const history: string[] = [];
  if (retrieved) history.push(`Order ${order.id} retrieved.`);
  if (checked) history.push(`Policy checked: eligible within ${policy.windowDays} days.`);
  if (choice && offered) history.push(`Customer chose ${choiceLabel(choice)}.`);
  if (confirmed && choice && offered) history.push("Customer confirmed.");
  if (submitDone && choice) {
    history.push(outage ? `${choice === "replacement" ? "Replacement" : "Refund"} submit FAILED: order system unavailable (simulated).` : `${choice === "replacement" ? "Replacement" : "Refund"} submitted.`);
  }
  if (ticketDone) history.push(outage ? `${script.ticketId} handed to a human with context.` : `${script.ticketId} resolved.`);
  if (notifyDone) history.push(outage ? "Handoff notice emailed to customer." : "Confirmation emailed to customer.");

  const handoff: View["handoff"] =
    outage && ticketDone && choice
      ? {
          ticketId: script.ticketId,
          failedAction: choice === "replacement" ? "Submit replacement" : `Submit refund of ${money(order.total)}`,
          order: order.id,
          error: "Order system unavailable (simulated)",
          failedStep: labels[3],
          customerChoice: `${choiceLabel(choice)} (confirmed)`,
          conversation: messages
            .filter((m) => m.id !== "reply")
            .map((m) => ({ from: m.from, text: m.text })),
        }
      : null;

  const doneSteps = steps.filter((s) => s.status === "done").length;
  // A failed submit stops the count there: later steps never read as completed work.
  const workflowIndex = outage && steps[3].status === "failed" ? 3 : doneSteps;

  let outcome: string | null = null;
  if (phase === "success") {
    outcome =
      choice === "replacement"
        ? `Order ${order.id}: replacement ordered. Ticket resolved. Customer emailed.`
        : `Order ${order.id}: ${money(order.total)} refund submitted. Ticket resolved. Customer emailed.`;
  } else if (phase === "failed") {
    outcome = `The action failed, so nothing was changed. The conversation and failed-action context went to a human on ticket ${script.ticketId}.`;
  }

  return { phase, messages, typing, actions, steps, order: orderView, ticket, notification, history, handoff, workflowIndex, outcome };
}
