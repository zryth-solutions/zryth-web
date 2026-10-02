"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  BOOKING_LIST,
  BOOKING_TYPES,
  isBookingSlug,
  type BookingSlug,
} from "@/content/bookings";

type Field = {
  name: string;
  label: string;
  hint: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  /** Returns an error message, or null when the value is acceptable. */
  validate?: (value: string) => string | null;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** E.164 allows 7–15 digits; we ignore spacing, dashes, parens and a leading +. */
function validatePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!/^\+?[\d\s()-]+$/.test(value)) {
    return "Use digits only, with an optional leading +.";
  }
  if (digits.length < 7 || digits.length > 15) {
    return "Enter a phone number between 7 and 15 digits.";
  }
  return null;
}

const FIELDS: Field[] = [
  {
    name: "company",
    label: "Company",
    hint: "Who you are and what you do.",
    type: "text",
    required: true,
    autoComplete: "organization",
  },
  {
    name: "email",
    label: "Work email",
    hint: "Where we should send what we find.",
    type: "email",
    required: true,
    autoComplete: "email",
    inputMode: "email",
    validate: (v) => (EMAIL.test(v) ? null : "Enter a valid email address."),
  },
  {
    name: "phone",
    label: "Phone",
    hint: "In case it's faster to just talk it through.",
    type: "tel",
    required: true,
    autoComplete: "tel",
    inputMode: "tel",
    validate: validatePhone,
  },
  {
    name: "workflow",
    label: "Anything you'd like to share?",
    hint: "The workflow, problem or context you'd like us to know about. Entirely optional.",
    type: "textarea",
    required: false,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function WorkflowForm() {
  const formId = useId();
  const reduced = useReducedMotion();
  const searchParams = useSearchParams();

  // Preselected by the banner CTA, but always switchable here so the form
  // still makes sense when someone lands on it directly.
  const requested = searchParams.get("type");
  const [booking, setBooking] = useState<BookingSlug>(
    isBookingSlug(requested) ? requested : "discovery-audit",
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const nextErrors: Record<string, string> = {};
    for (const field of FIELDS) {
      const value = String(data.get(field.name) ?? "").trim();

      if (!value) {
        if (field.required) nextErrors[field.name] = `${field.label} is required.`;
        continue;
      }

      const message = field.validate?.(value);
      if (message) nextErrors[field.name] = message;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document
        .getElementById(`${formId}-${Object.keys(nextErrors)[0]}`)
        ?.focus();
      return;
    }

    // Netlify Forms: POST url-encoded to the static definition in
    // public/__forms.html, which registers the form at deploy time.
    setStatus("sending");
    // form-name already comes through FormData from the hidden input.
    const body = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      body.append(key, String(value));
    }

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`Submit failed: ${response.status}`);
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  }

  if (submitted) {
    return (
      <motion.div
        role="status"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-2xl border border-brand-200 bg-brand-50 p-10"
      >
        <h2 className="text-h3 font-semibold">
          <span className="text-gradient">Got it.</span>
        </h2>
        <p className="mt-4 max-w-md text-body text-ink-soft pretty">
          Your {BOOKING_TYPES[booking].short.toLowerCase()} is requested.
          We&rsquo;ll come back to you with what that workflow could look
          like: not a proposal, a picture of the new version.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      name="workflow-intake"
      data-netlify="true"
      className="space-y-8"
    >
      <input type="hidden" name="form-name" value="workflow-intake" />

      {/* Honeypot: hidden from people, tempting to bots. */}
      <p className="hidden">
        <label>
          Leave this field empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <fieldset>
        <legend className="text-sm font-semibold tracking-tight text-ink">
          What would you like?
        </legend>
        <p className="mt-1.5 text-sm text-ink-muted">
          All are free. You can ask for the others later.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {BOOKING_LIST.map((option) => {
            const active = booking === option.slug;
            return (
              <label
                key={option.slug}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors duration-200 ${
                  active
                    ? "border-brand-400 bg-brand-50"
                    : "border-line bg-surface hover:border-brand-200"
                }`}
              >
                <input
                  type="radio"
                  name="bookingType"
                  value={option.slug}
                  checked={active}
                  onChange={() => setBooking(option.slug)}
                  className="h-4 w-4 shrink-0 accent-brand-500"
                />
                <BookingIcon slug={option.slug} />
                <span className="text-sm font-semibold text-ink">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {FIELDS.map((field) => {
        const id = `${formId}-${field.name}`;
        const error = errors[field.name];
        const describedBy = error ? `${id}-error` : `${id}-hint`;

        return (
          <div key={field.name}>
            <label
              htmlFor={id}
              className="block text-sm font-semibold tracking-tight text-ink"
            >
              {field.label}
              {!field.required && (
                <span className="ml-2 font-normal text-ink-faint">
                  Optional
                </span>
              )}
            </label>

            <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-muted">
              {field.hint}
            </p>

            {field.type === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                rows={4}
                required={field.required}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                className={inputClass(Boolean(error))}
              />
            ) : (
              <input
                id={id}
                name={field.name}
                type={field.type}
                required={field.required}
                autoComplete={field.autoComplete}
                inputMode={field.inputMode}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                className={inputClass(Boolean(error))}
              />
            )}

            {error && (
              <p
                id={`${id}-error`}
                className="mt-2 text-sm font-medium text-red-600"
              >
                {error}
              </p>
            )}
          </div>
        );
      })}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-brand-gradient inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 text-[0.9375rem] font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Start with one workflow"}
        </button>

        {status === "error" && (
          <p role="alert" className="mt-4 text-sm font-medium text-red-600">
            That didn&rsquo;t send. Please try again, or email us directly at{" "}
            <a href="mailto:hello@zryth.com" className="underline">
              hello@zryth.com
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

/** Small circular glyph identifying each booking option. */
function BookingIcon({ slug }: { slug: BookingSlug }) {
  const paths: Record<BookingSlug, ReactNode> = {
    "discovery-audit": (
      <>
        <circle cx="7.2" cy="7.2" r="4.2" />
        <path d="M10.4 10.4L14 14" strokeLinecap="round" />
      </>
    ),
    "ai-seminar": (
      <>
        <rect x="2" y="3" width="12" height="8" rx="1.4" />
        <path d="M6 14h4M8 11v3" strokeLinecap="round" />
      </>
    ),
    "ai-automation": (
      <>
        <path
          d="M8 2.5a5.5 5.5 0 1 1-5.2 3.7"
          strokeLinecap="round"
        />
        <path d="M2.4 3.2v3.2h3.2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };

  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        stroke="#1b49a4"
        strokeWidth="1.4"
      >
        {paths[slug]}
      </svg>
    </span>
  );
}

function inputClass(hasError: boolean) {
  return `mt-3 w-full rounded-xl border bg-surface px-4 py-3 text-base text-ink transition-colors duration-200 placeholder:text-ink-faint focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/12 ${
    hasError ? "border-red-400" : "border-line"
  }`;
}
