"use client";

import { useEffect, useRef, useState } from "react";

/** Manual work going in — drawn, never labelled. */
const INPUTS = [
  { id: "doc", y: 46 },
  { id: "person", y: 106 },
  { id: "sheet", y: 166 },
  { id: "mail", y: 226 },
];

/** What comes back out: an agent working, and the job finished. */
const OUTPUTS = [
  { id: "agent", y: 96 },
  { id: "done", y: 176 },
];

const LINKS = [
  { d: "M70,46 C132,46 152,136 188,136", delay: "0s" },
  { d: "M70,106 C132,106 152,136 188,136", delay: "0.45s" },
  { d: "M70,166 C132,166 152,136 188,136", delay: "0.9s" },
  { d: "M70,226 C132,226 152,136 188,136", delay: "1.35s" },
  { d: "M252,136 C300,136 322,96 366,96", delay: "1.8s" },
  { d: "M252,136 C300,136 322,176 366,176", delay: "2.05s" },
];

/**
 * Hero visual: documents, people, spreadsheets and email go into Zryth;
 * agents and finished work come out. Icons only — nothing to read.
 * Decorative, hidden from assistive tech, paused when off screen.
 */
export function HeroFlow() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 440 272"
      fill="none"
      aria-hidden="true"
      className={`h-auto w-full max-w-md ${visible ? "" : "flow-paused"}`}
    >
      <defs>
        <linearGradient id="flow-core" x1="190" y1="106" x2="250" y2="166">
          <stop offset="0%" stopColor="#163b84" />
          <stop offset="55%" stopColor="#215ac8" />
          <stop offset="100%" stopColor="#5182db" />
        </linearGradient>
      </defs>

      {LINKS.map((link) => (
        <path
          key={link.d}
          d={link.d}
          stroke="#dfe8f9"
          strokeWidth="1.25"
          fill="none"
        />
      ))}

      {/* Manual inputs */}
      {INPUTS.map((input) => (
        <g key={input.id} transform={`translate(46 ${input.y})`}>
          <rect
            x="-22"
            y="-22"
            width="44"
            height="44"
            rx="13"
            fill="#ffffff"
            stroke="#e6e9f0"
          />
          <g
            stroke="#5c6579"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <InputIcon id={input.id} />
          </g>
        </g>
      ))}

      {/* Zryth */}
      <rect
        x="190"
        y="106"
        width="60"
        height="60"
        rx="18"
        fill="url(#flow-core)"
      />
      <image
        href="/zryth-mark-white.png"
        x="204"
        y="120"
        width="32"
        height="32"
      />

      {/* Automated outputs */}
      {OUTPUTS.map((output) => (
        <g key={output.id} transform={`translate(390 ${output.y})`}>
          <rect
            x="-24"
            y="-24"
            width="48"
            height="48"
            rx="14"
            fill="#215ac8"
          />
          <g
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <OutputIcon id={output.id} />
          </g>
        </g>
      ))}

      {/* Work in motion */}
      {LINKS.map((link) => (
        <circle
          key={`dot-${link.d}`}
          className="flow-dot"
          r="3.5"
          fill="#215ac8"
          style={
            {
              "--flow-path": `path("${link.d}")`,
              "--flow-delay": link.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}

function InputIcon({ id }: { id: string }) {
  switch (id) {
    case "doc":
      return (
        <>
          <path d="M-5.5,-8h7l4,4v12h-11z" />
          <path d="M-2.5,-1h5M-2.5,3h5" />
        </>
      );
    case "person":
      return (
        <>
          <circle cx="0" cy="-4" r="3.4" />
          <path d="M-6,8a6,6 0 0 1 12,0" />
        </>
      );
    case "sheet":
      return (
        <>
          <rect x="-7.5" y="-6.5" width="15" height="13" rx="1.5" />
          <path d="M-7.5,-2h15M-1.5,-2v8.5" />
        </>
      );
    default:
      return (
        <>
          <rect x="-7.5" y="-5.5" width="15" height="11" rx="1.5" />
          <path d="M-7,-4.5 L0,1.5 L7,-4.5" />
        </>
      );
  }
}

function OutputIcon({ id }: { id: string }) {
  if (id === "agent") {
    // Spark — the agent doing the work.
    return (
      <>
        <path d="M0,-9 L2,-2 L9,0 L2,2 L0,9 L-2,2 L-9,0 L-2,-2 Z" />
      </>
    );
  }
  // Finished.
  return <path d="M-5.5,0.5 L-1.5,4.5 L6,-4" />;
}
