"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useActive } from "@/lib/demos/useActivity";
import type { PreviewKind } from "@/content/demos/cards";

const d = (s: number): CSSProperties => ({ ["--dp-delay" as string]: `${s}s` });

/** Frame shared by every preview: animates only while on screen and visible. */
function Frame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useActive(ref);
  return (
    <div
      ref={ref}
      data-active={active}
      aria-hidden="true"
      className="dp relative h-full w-full overflow-hidden bg-gradient-to-br from-brand-50 via-surface to-brand-100/60"
    >
      {children}
    </div>
  );
}

function Chip({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span
      style={style}
      className={`inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-1 text-[0.6875rem] font-semibold text-ink-soft shadow-sm ${className}`}
    >
      {children}
    </span>
  );
}

const amber = "border-amber-200 bg-amber-50 text-amber-800";
const green = "border-emerald-200 bg-emerald-50 text-emerald-800";

/** Flour mill: a handwritten bill is read and matched to its purchase order; a duplicate is flagged. */
function BillPreview() {
  return (
    <Frame>
      <div className="absolute left-[7%] top-[12%] h-[76%] w-[38%] rounded-md border border-line bg-surface p-3 shadow-sm">
        <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-ink-faint">Bill</p>
        {[0, 1, 2].map((i) => (
          <svg key={i} viewBox="0 0 60 8" className="mt-2 w-[85%]" fill="none" aria-hidden="true">
            <path
              d="M1 5 q3 -5 6 0 t6 0 t6 0 t6 0 t6 0 t6 0 t6 0 t6 0 t6 0"
              stroke="#5182db"
              strokeWidth="1.4"
              strokeLinecap="round"
              pathLength="1"
              className="dp-draw"
              style={d(0.4 + i * 0.7)}
            />
          </svg>
        ))}
        <div className="mt-3 h-5 w-2/3 rounded border border-brand-300 bg-brand-50" />
      </div>

      <svg viewBox="0 0 100 62.5" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <path d="M45 30 C 50 30, 50 24, 55 24" stroke="#5182db" strokeWidth="1.6" strokeLinecap="round" pathLength="1" className="dp-draw" style={d(2.6)} vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="dp-in absolute right-[7%] top-[12%] w-[36%] rounded-md border border-line bg-surface px-3 py-2 shadow-sm" style={d(2.8)}>
        <p className="whitespace-nowrap text-[0.5625rem] font-semibold uppercase tracking-wider text-ink-faint">Purchase order</p>
        <div className="mt-2 h-1.5 w-4/5 rounded bg-line" />
        <div className="mt-1.5 h-1.5 w-3/5 rounded bg-line" />
      </div>
      <div className="absolute right-[7%] top-[48%] flex flex-col items-start gap-2">
        <Chip className={`dp-in ${green}`} style={d(3.6)}>
          ✓ Matches the order
        </Chip>
        <Chip className={`dp-in ${amber}`} style={d(4.6)}>
          ! Duplicate flagged
        </Chip>
      </div>
    </Frame>
  );
}

/** Publisher: a question PDF becomes one structured question with its options. */
function QuestionsPreview() {
  return (
    <Frame>
      <div className="absolute left-[7%] top-[12%] h-[76%] w-[32%] overflow-hidden rounded-md border border-line bg-surface p-3 shadow-sm">
        <span className="rounded bg-red-500 px-1.5 py-0.5 text-[0.5625rem] font-bold text-white">PDF</span>
        <div className="mt-3 space-y-2">
          {[90, 70, 82, 55, 76, 64].map((w, i) => (
            <div key={i} className="h-1 rounded bg-line" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="dp-scan absolute inset-x-0 h-0.5 bg-brand-500 shadow-[0_0_10px_2px_rgba(33,90,200,0.5)]" />
      </div>

      <div className="dp-in absolute right-[7%] top-[12%] h-[76%] w-[50%] rounded-md border border-line bg-surface p-3 shadow-sm" style={d(1.6)}>
        <div className="flex items-center justify-between">
          <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-brand-600">Question 14</p>
          <span className="rounded bg-brand-50 px-1.5 text-[0.5625rem] font-semibold text-brand-700">Maths</span>
        </div>
        <div className="mt-2 flex gap-2">
          <div className="flex-1 space-y-1.5 pt-1">
            <div className="h-1.5 w-full rounded bg-line" />
            <div className="h-1.5 w-4/5 rounded bg-line" />
          </div>
          <svg viewBox="0 0 40 28" className="h-7 w-10 shrink-0 rounded border border-line bg-surface-alt" fill="none" aria-hidden="true">
            <path d="M6 22 L20 6 L34 22 Z" stroke="#85a7e7" strokeWidth="1.6" strokeLinejoin="round" pathLength="1" className="dp-draw" style={d(2.4)} />
          </svg>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {["A", "B", "C", "D"].map((l, i) => (
            <div key={l} className="dp-in flex items-center gap-1.5 rounded border border-line px-1.5 py-0.5" style={d(3 + i * 0.35)}>
              <span className="flex size-3.5 items-center justify-center rounded-full bg-brand-100 text-[0.5rem] font-bold text-brand-700">{l}</span>
              <span className="h-1 flex-1 rounded bg-line" />
            </div>
          ))}
        </div>
        <Chip className={`dp-in mt-2 !py-0.5 ${green}`} style={d(4.6)}>
          ✓ Structured
        </Chip>
      </div>
    </Frame>
  );
}

/** CA firm: Tally, GST and TDS records converge and reconcile into one report. */
function LedgersPreview() {
  const sources = ["Tally", "GST", "TDS"];
  return (
    <Frame>
      <div className="absolute left-[7%] top-[12%] flex h-[76%] w-[27%] flex-col justify-between">
        {sources.map((name, i) => (
          <div key={name} className="dp-in rounded-md border border-line bg-surface px-3 py-2 shadow-sm" style={d(0.3 + i * 0.5)}>
            <p className="text-xs font-semibold text-ink">{name}</p>
            <div className="mt-1.5 h-1 w-3/4 rounded bg-line" />
          </div>
        ))}
      </div>

      <svg viewBox="0 0 100 62.5" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        {[16, 31, 46].map((y, i) => (
          <path key={y} d={`M34 ${y} C 44 ${y}, 46 31, 56 31`} stroke="#5182db" strokeWidth="1.6" strokeLinecap="round" pathLength="1" className="dp-draw" style={d(1.8 + i * 0.3)} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <div className="dp-in absolute right-[7%] top-[16%] w-[36%] rounded-md border border-line bg-surface p-3 shadow-sm" style={d(3)}>
        <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-brand-600">Reconciliation</p>
        <div className="mt-2 space-y-1.5">
          {["Ledgers", "GST", "TDS"].map((r, i) => (
            <div key={r} className="dp-in flex items-center gap-2" style={d(3.4 + i * 0.4)}>
              <span className="flex size-3.5 items-center justify-center rounded-full bg-emerald-100 text-[0.5rem] font-bold text-emerald-800">✓</span>
              <span className="h-1 flex-1 rounded bg-line" />
            </div>
          ))}
        </div>
      </div>
      <Chip className={`dp-in absolute right-[7%] top-[66%] ${green}`} style={d(5)}>
        ✓ Ready for review
      </Chip>
    </Frame>
  );
}

function ChatPreview() {
  return (
    <Frame>
      <div className="absolute inset-x-[8%] top-[7%] space-y-2">
        <div className="dp-in w-fit max-w-[80%] rounded-2xl rounded-bl-sm border border-line bg-surface px-3 py-1.5 text-[0.6875rem] text-ink shadow-sm" style={d(0.2)}>
          My order arrived damaged.
        </div>
        <div className="dp-in ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-brand-500 px-3 py-1.5 text-[0.6875rem] text-white shadow-sm" style={d(1.1)}>
          Replacement or $109 refund?
        </div>
        <div className="dp-in w-fit rounded-2xl rounded-bl-sm border border-line bg-surface px-3 py-1.5 text-[0.6875rem] text-ink shadow-sm" style={d(2.1)}>
          Replacement
        </div>
        <div className="dp-in ml-auto flex w-fit gap-1 rounded-2xl rounded-br-sm bg-brand-500/90 px-3 py-2 shadow-sm" style={d(3)}>
          {[0, 0.15, 0.3].map((x) => (
            <span key={x} className="dp-dots size-1.5 rounded-full bg-white" style={d(x)} />
          ))}
        </div>
        <div className="dp-in" style={d(3.9)}>
          <Chip className="border-emerald-200 bg-emerald-50 text-emerald-800">✓ Order and ticket updated</Chip>
        </div>
      </div>
    </Frame>
  );
}

function VoicePreview() {
  const bars = [0.4, 0.7, 0.5, 0.95, 0.6, 0.85, 0.45, 0.75, 0.55, 1, 0.65, 0.8, 0.5, 0.7, 0.4, 0.9, 0.6, 0.5, 0.8, 0.45, 0.7, 0.55];
  return (
    <Frame>
      <div className="absolute inset-x-[10%] top-[18%] flex h-[34%] items-center justify-between gap-1">
        {bars.map((h, i) => (
          <span key={i} className="dp-bar w-1.5 rounded-full bg-brand-400" style={{ height: `${h * 100}%`, ...d((i % 7) * 0.12) }} />
        ))}
      </div>
      <div className="absolute inset-x-[10%] top-[58%] space-y-2">
        <div className="dp-in rounded-md border border-line bg-surface px-3 py-1.5 text-xs text-ink shadow-sm" style={d(0.4)}>
          <span className="font-semibold text-brand-600">Caller</span> Move my installation to Friday.
        </div>
        <div className="dp-in" style={d(2.4)}>
          <Chip className="border-emerald-200 bg-emerald-50 text-emerald-800">✓ BK-2048 updated</Chip>
        </div>
      </div>
    </Frame>
  );
}

export function DemoPreview({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case "bill":
      return <BillPreview />;
    case "questions":
      return <QuestionsPreview />;
    case "ledgers":
      return <LedgersPreview />;
    case "voice":
      return <VoicePreview />;
    case "chat":
      return <ChatPreview />;
  }
}
