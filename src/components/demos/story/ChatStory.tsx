"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Figure, OutcomeCallout, smallButton } from "@/components/demos/story/shared";
import { TimelineControls } from "@/components/demos/TimelineControls";
import { getDemo } from "@/content/demos";
import {
  CONNECTORS,
  EXEC,
  EXEC_TIMELINE,
  INTRO,
  INTRO_TIMELINE,
  ORDER,
  POLICY,
  SCENARIO_LABEL,
  TEXT,
  TICKET_ID,
} from "@/content/demos/chat-ai";
import { chatView, type ChatScript, type Choice, type Flow, type Scenario, type StepStatus, type View } from "@/lib/demos/chat-flow";
import { useTimeline, type Timeline } from "@/lib/demos/useTimeline";

const meta = getDemo("chat-ai");

const SCRIPT: ChatScript = {
  order: ORDER,
  policy: POLICY,
  ticketId: TICKET_ID,
  intro: INTRO,
  exec: EXEC,
  text: TEXT,
  stepLabels: meta.workflow,
};

const FRESH: Flow = { scenario: "normal", choice: null, confirmed: false };

type Ctx = {
  view: View;
  flow: Flow;
  intro: Timeline;
  reduced: boolean;
  choose: (c: Choice) => void;
  confirm: () => void;
  changeMind: () => void;
  setScenario: (s: Scenario) => void;
  reset: () => void;
  startIntro: () => void;
};

const ChatContext = createContext<Ctx | null>(null);
const useChat = () => {
  const c = useContext(ChatContext);
  if (!c) throw new Error("Chat figures must sit inside <ChatStory>");
  return c;
};

/** Owns the conversation: the scripted opening, the user's branches and the simulated action run. */
export function ChatStory({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion() ?? false;
  const intro = useTimeline({ cues: INTRO_TIMELINE.cues, total: INTRO_TIMELINE.total, autoplay: false, reducedMotion: reduced });
  const exec = useTimeline({ cues: EXEC_TIMELINE.cues, total: EXEC_TIMELINE.total, autoplay: false, reducedMotion: reduced });
  const [flow, setFlow] = useState<Flow>(FRESH);

  const view = useMemo(() => chatView(SCRIPT, intro.time, flow, exec.time), [intro.time, flow, exec.time]);

  const value: Ctx = {
    view,
    flow,
    intro,
    reduced,
    startIntro: () => {
      if (!reduced) intro.replay();
    },
    choose: (choice) => {
      intro.pause();
      setFlow((f) => ({ ...f, choice }));
    },
    confirm: () => {
      intro.pause();
      setFlow((f) => ({ ...f, confirmed: true }));
      if (reduced) exec.seek(EXEC_TIMELINE.total);
      else {
        exec.seek(0);
        exec.play();
      }
    },
    changeMind: () => setFlow((f) => ({ ...f, choice: null })),
    setScenario: (scenario) => {
      if (scenario === flow.scenario) return;
      // Jump straight to the offer so the other branch can be tried right away.
      exec.pause();
      exec.seek(0);
      intro.pause();
      intro.seek(INTRO_TIMELINE.total);
      setFlow({ scenario, choice: null, confirmed: false });
    },
    reset: () => {
      exec.pause();
      exec.seek(0);
      setFlow((f) => ({ ...FRESH, scenario: f.scenario }));
      intro.replay();
    },
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

/* ------------------------------------------------------------ small bits */

function Bubble({ from, children }: { from: "customer" | "agent"; children: ReactNode }) {
  const customer = from === "customer";
  return (
    <div className={`flex ${customer ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${customer ? "rounded-br-sm bg-brand-600 text-white" : "rounded-bl-sm border border-line bg-surface-alt text-ink"}`}>
        <span className="sr-only">{customer ? "Customer: " : "Agent: "}</span>
        {children}
      </div>
    </div>
  );
}

function ChoiceButton({ children, onClick, primary = false }: { children: ReactNode; onClick: () => void; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 w-full items-center justify-center rounded-full px-4 text-sm font-medium transition-colors duration-200 sm:min-h-10 sm:w-auto ${
        primary ? "bg-brand-600 text-white hover:bg-brand-700" : "border border-brand-300 bg-surface text-brand-700 hover:bg-brand-50"
      }`}
    >
      {children}
    </button>
  );
}

function Record({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="px-4 py-3">
      <dt className="label text-ink-faint">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

function StepIcon({ status }: { status: StepStatus }) {
  const base = "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-bold";
  if (status === "done")
    return (
      <span role="img" aria-label="Done" className={`${base} bg-emerald-100 text-emerald-800`}>
        ✓
      </span>
    );
  if (status === "failed")
    return (
      <span role="img" aria-label="Failed" className={`${base} bg-red-100 text-red-800`}>
        ✕
      </span>
    );
  if (status === "running") return <span role="img" aria-label="Running" className={`${base} border-2 border-brand-200 border-t-brand-600 motion-safe:animate-spin`} />;
  return <span role="img" aria-label="Waiting" className={`${base} border border-line text-ink-faint`} />;
}

/* --------------------------------------------------------------- figures */

/** Figure 1: the customer conversation. The agent's messages play; you choose the customer's replies. */
export function ChatConversationFigure() {
  const { view, flow, intro, reduced, choose, confirm, changeMind, setScenario, reset, startIntro } = useChat();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [view.messages.length, view.typing, view.actions, reduced]);

  return (
    <Figure
      index={1}
      title="The conversation"
      onVisible={startIntro}
      caption="The opening plays by itself, then the replies are yours. Choose replacement or refund, confirm, and try the system-unavailable path to see the handoff."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div role="radiogroup" aria-label="Choose a scenario" className="grid grid-cols-2 gap-2 sm:flex">
          {(["normal", "outage"] as const).map((sc) => (
            <button
              key={sc}
              type="button"
              role="radio"
              aria-checked={flow.scenario === sc}
              onClick={() => setScenario(sc)}
              className={`min-h-11 rounded-full px-3.5 py-2 text-center text-sm font-medium transition-colors duration-200 sm:min-h-0 sm:py-1.5 ${
                flow.scenario === sc ? "bg-brand-600 text-white" : "border border-line text-ink-soft hover:border-brand-300"
              }`}
            >
              {SCENARIO_LABEL[sc]}
            </button>
          ))}
        </div>
        <button type="button" onClick={reset} className={`${smallButton} self-start`}>
          Reset demo
        </button>
      </div>

      <section className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm" aria-label="Sample customer chat">
        <header className="flex items-center gap-3 border-b border-line-soft bg-surface-alt px-4 py-3">
          <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
            Z
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Support assistant</p>
            <p className="text-xs text-ink-muted">Scripted sample conversation</p>
          </div>
        </header>

        <div ref={listRef} role="log" aria-live="polite" aria-label="Conversation" className="h-[min(26rem,58svh)] space-y-3 overflow-y-auto bg-surface p-4 sm:h-[24rem]">
          {view.messages.length === 0 && <p className="pt-24 text-center text-sm text-ink-faint">The conversation starts when this figure scrolls into view.</p>}
          {view.messages.map((m) => (
            <Bubble key={m.id} from={m.from}>
              {m.text}
            </Bubble>
          ))}
          {view.typing && (
            <div className="flex" aria-label="The agent is typing" role="status">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-line bg-surface-alt px-4 py-3">
                {[0, 0.15, 0.3].map((d) => (
                  <span key={d} className="typing-dot size-1.5 rounded-full bg-ink-faint" style={{ ["--dp-delay" as string]: `${d}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="min-h-[4.25rem] border-t border-line-soft bg-surface-alt px-4 py-3">
          {view.actions === "options" && (
            <div>
              <p className="text-sm text-ink-muted">Reply as the customer:</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <ChoiceButton onClick={() => choose("replacement")}>Replacement</ChoiceButton>
                <ChoiceButton onClick={() => choose("refund")}>Refund</ChoiceButton>
              </div>
            </div>
          )}
          {view.actions === "confirm" && (
            <div>
              <p className="text-sm text-ink-muted">The agent asks before acting:</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <ChoiceButton primary onClick={confirm}>
                  Confirm
                </ChoiceButton>
                <ChoiceButton onClick={changeMind}>Change choice</ChoiceButton>
              </div>
            </div>
          )}
          {view.actions === null && (
            <p className="text-sm text-ink-muted">
              {view.phase === "success" || view.phase === "failed"
                ? "Conversation finished. Switch scenario or reset to try another path."
                : view.phase === "executing"
                  ? "Running the confirmed action…"
                  : "The opening plays automatically. You choose the replies when options appear."}
            </p>
          )}
        </div>
      </section>

      <TimelineControls timeline={intro} className="mt-4" />
    </Figure>
  );
}

/** Figure 2: what the agent is doing in the systems behind the chat. */
export function ChatBackstageFigure() {
  const { view } = useChat();
  return (
    <Figure
      index={2}
      title="What happens behind the conversation"
      caption="Order, ticket and notification are sample records. A failed action never reads as success: it changes nothing and hands the conversation to a person."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <ul className="mb-3 flex flex-wrap gap-1.5" aria-label="Generic connectors used">
            {CONNECTORS.map((c) => (
              <li key={c} className="rounded-full border border-line bg-surface-alt px-2.5 py-0.5 text-[0.6875rem] font-medium text-ink-muted">
                {c}
              </li>
            ))}
          </ul>
          <ol className="space-y-3 rounded-xl border border-line bg-surface p-4">
            {view.steps.map((s) => (
              <li key={s.id} className="flex gap-3">
                <StepIcon status={s.status} />
                <div className="min-w-0">
                  <p className={`text-sm ${s.status === "idle" ? "text-ink-faint" : "font-semibold text-ink"}`}>{s.label}</p>
                  <p className={`text-xs ${s.status === "failed" ? "font-medium text-red-700" : "text-ink-muted"}`}>{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <dl className="divide-y divide-line-soft rounded-xl border border-line bg-surface text-sm">
            <Record label={`Order ${ORDER.id}`}>
              {view.order.loaded ? (
                <>
                  <p className="font-semibold text-ink">{view.order.status}</p>
                  <p className="text-xs text-ink-muted">
                    {ORDER.item} · ${ORDER.total.toFixed(2)} · Resolution: {view.order.resolution} · {view.order.stock}
                  </p>
                  {view.order.note && <p className="mt-1 text-xs font-medium text-red-700">{view.order.note}</p>}
                </>
              ) : (
                <p className="text-ink-faint">Not loaded yet</p>
              )}
            </Record>
            <Record label="Support ticket">
              {view.ticket ? (
                <p>
                  <span className="font-semibold text-ink">{view.ticket.id}</span> ·{" "}
                  <span className={view.ticket.status === "Escalated to human" ? "font-semibold text-amber-800" : "text-ink-soft"}>{view.ticket.status}</span>
                </p>
              ) : (
                <p className="text-ink-faint">Created when the chat starts</p>
              )}
            </Record>
            <Record label="Notification">{view.notification ? <p className="text-ink-soft">{view.notification}</p> : <p className="text-ink-faint">None sent yet</p>}</Record>
            <Record label="Action history">
              {view.history.length ? (
                <ol className="list-decimal space-y-0.5 pl-4 text-xs text-ink-soft">
                  {view.history.map((h) => (
                    <li key={h} className={h.includes("FAILED") ? "font-semibold text-red-700" : ""}>
                      {h}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-ink-faint">Nothing yet</p>
              )}
            </Record>
          </dl>

          {view.handoff && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm" role="region" aria-label="Human handoff ticket">
              <h4 className="font-semibold text-amber-900">Handoff ticket {view.handoff.ticketId}</h4>
              <p className="mt-1 text-xs text-amber-900">Sent to a human with everything needed, so the customer does not repeat themselves.</p>
              <dl className="mt-3 space-y-1 text-xs text-ink-soft">
                <div className="flex gap-2">
                  <dt className="font-semibold text-ink">Failed action:</dt>
                  <dd>
                    {view.handoff.failedAction} on {view.handoff.order}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-ink">Error:</dt>
                  <dd>{view.handoff.error}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-ink">Failed at:</dt>
                  <dd>{view.handoff.failedStep}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-ink">Customer chose:</dt>
                  <dd>{view.handoff.customerChoice}</dd>
                </div>
              </dl>
              <details className="mt-3">
                <summary className="cursor-pointer text-xs font-semibold text-amber-900">Conversation attached ({view.handoff.conversation.length} messages)</summary>
                <ul className="mt-2 space-y-1 text-xs text-ink-soft">
                  {view.handoff.conversation.map((m, i) => (
                    <li key={i}>
                      <span className="font-semibold text-ink">{m.from === "customer" ? "Customer" : "Agent"}:</span> {m.text}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          )}
        </div>
      </div>
    </Figure>
  );
}

export function ChatOutcome() {
  const { view } = useChat();
  return <OutcomeCallout outcome={view.outcome ? <p>{view.outcome}</p> : null} />;
}
