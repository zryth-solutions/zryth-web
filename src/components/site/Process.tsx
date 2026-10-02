import { Reveal } from "@/components/motion/Reveal";

export const PROCESS = [
  {
    id: "01",
    name: "See",
    headline: "First, we watch the work happen.",
    body: "We get inside the workflows, systems, conversations and decisions that actually run your business. Not how the process is supposed to work.",
    emphasis: "How it really works.",
  },
  {
    id: "02",
    name: "Find",
    headline: "Find the work that shouldn't be work anymore.",
    body: "The repetitive. The expensive. The slow. The manual.",
    emphasis:
      "The things people do simply because software couldn't do them before.",
  },
  {
    id: "03",
    name: "Prove",
    headline: "Before we transform the business, we prove the idea.",
    body: "Small pilots. Real workflows. Real users. Real numbers.",
    emphasis: "If it doesn't create value, we don't scale it.",
  },
  {
    id: "04",
    name: "Build",
    headline: "Then we build the new way.",
    body: "An AI agent. An automated workflow. An intelligent ERP. A custom application. A computer vision system. Sometimes an entirely new product.",
    emphasis: "Whatever makes the old process unnecessary.",
  },
  {
    id: "05",
    name: "Embed",
    headline:
      "New technology only matters when it becomes the normal way to work.",
    body: "We integrate it. Train your people. Move the workflow.",
    emphasis: "And make the new way feel obvious.",
  },
  {
    id: "06",
    name: "Compound",
    headline:
      "Save an hour once, you improved a task. Save it every day, you changed the business.",
    body: "We measure the impact. Then find the next opportunity. Then the next. Then the next.",
    emphasis: "That's how AI becomes ROI.",
  },
];

export function ProcessList() {
  return (
    <div className="mt-16 sm:mt-24">
      {PROCESS.map((step, i) => (
        <Reveal key={step.id} delay={i === 0 ? 0 : 0.04}>
          <div className="group grid gap-6 border-t border-line py-12 transition-colors duration-500 hover:border-brand-200 sm:py-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="flex items-baseline gap-3">
                <span className="text-sm font-semibold tabular-nums text-brand-500">
                  {step.id}
                </span>
                <span className="text-h3 font-semibold tracking-tight">
                  {step.name}
                </span>
              </p>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <h3 className="text-h3 font-semibold balance">
                {step.headline}
              </h3>
              <p className="mt-5 max-w-xl text-body text-ink-soft pretty">
                {step.body}
              </p>
              <p className="mt-4 max-w-xl text-base font-medium text-ink pretty">
                {step.emphasis}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
      <div className="border-t border-line" />
    </div>
  );
}
