# Case studies: Document AI blogs and interactive walkthroughs

`/case-studies` is the former "Research Work" page, renamed: it lists the two case-study write-ups (`/case-studies/mill-software-bill-verification`, `/case-studies/mock-test-question-extraction`; source: `src/content/case-write-ups.ts`). `/research-work` and those two old URLs redirect permanently to the new ones (`next.config.ts`).

The earlier Case Studies index (filter chips and the five demo cards) has been removed, but these articles still exist and are reached from the homepage, the Services pages and each other's "Next" links:

| Piece | Route | What it is |
| --- | --- | --- |
| Why a flour mill needs Document AI | `/case-studies/document-ai-flour-mills` | Industry blog: use cases, one simple animation, real results |
| Why a publisher needs Document AI | `/case-studies/document-ai-publishers` | Same |
| Why a CA firm needs Document AI | `/case-studies/document-ai-ca-firms` | Same |
| Calls that lead to action | `/case-studies/voice-ai` | Interactive walkthrough on sample data, with scripted audio |
| Support that completes the workflow | `/case-studies/chat-ai` | Interactive walkthrough on sample data |
| Client stories (Mill Software, audit firm, publisher) | `/case-studies/mill-software`, `/audit-firm-transformation`, `/publisher-ai-transformation` | Written client accounts |

## Document AI blogs

Short on purpose (about 450 words): the problem in that industry, a three-step animation, a plain list of where Document AI helps, the result at a real client, and when it fits. **Every result is already published elsewhere on the site; nothing is estimated.**

| Blog | Result quoted | Where it is published |
| --- | --- | --- |
| Flour mills | Verification accuracy about 70–75% to 98%; checking takes 60–70% longer by design; about one in three bills handwritten | `src/content/research-work.ts` ("The Bills Nobody Was Checking") |
| Publishers | Cost per question about ₹12 to ₹5; 100 questions about 12 h to about 2 h; text about 100% / complex about 95% extraction accuracy in testing. "About ₹50,000 instead of ₹1,20,000 for 10,000 questions" is arithmetic from the published ₹5 and ₹12 | `src/content/research-work.ts` ("The ₹12 Question") |
| CA firms | Audits about 60% faster; about 80% fewer manual errors; 12 months of GST and TDS reconciled automatically; four tools to one | `src/content/case-studies.ts` (audit firm) |

The animations (three steps lighting up, ROI bars and counters) are illustrative, not real client documents, and are captioned as such. They start when scrolled into view, pause offscreen and show a static final state under `prefers-reduced-motion`.

To add a blog, add an entry to `DOC_STORIES` in `src/content/demos/document-ai-stories.ts` (text, three flow stages, ROI items, links). It appears on the index and in the sitemap automatically. Only quote results you can point to.

## Interactive walkthroughs (Voice AI, Chat AI)

Fixtures and scripted audio only. Nothing calls a live model, OCR service, agent or backend, and there is no microphone capture, upload or paid runtime API. Each figure is labelled "Interactive demo · sample data"; Voice AI adds "Scripted audio demonstration".

| Demo | What it actually is |
| --- | --- |
| Chat AI | A scripted opening plus your choices (replacement / refund, confirm, normal / system unavailable) driven by `src/lib/demos/chat-flow.ts`. A failed action never shows success (tested across every timing). |
| Voice AI | Scripted synthesised speech generated at build time with Kokoro. It is **not** a recording of a Zryth agent and says nothing about live latency, interruption handling or reasoning. The transcript and action panel are computed from `audio.currentTime` against a timing manifest, so seeking works. |

## Run it

```bash
npm install
npm run dev          # http://localhost:3000/case-studies
npm run build
```

Each article ends with "Build this for my team", linking to `/get-started?type=ai-automation&useCase=<card id>`. The contact form pre-fills its optional message for known card ids only (`src/content/demos/cards.ts`).

## Layout of the code

| Concern | Location |
| --- | --- |
| Card list (used for the homepage proof section and "Next" links) | `src/content/demos/cards.ts`, `src/components/demos/CaseStudyCard.tsx` |
| Document AI blogs: text and data | `src/content/demos/document-ai-stories.ts` |
| Document AI blogs: page and figures | `src/app/case-studies/[slug]/page.tsx`, `src/components/demos/story/DocStoryArticle.tsx`, `SimpleFigures.tsx`, `StoryBits.tsx` |
| Voice / Chat routes and article text | `src/app/case-studies/{voice-ai,chat-ai}/page.tsx`, `src/content/demos/articles.ts` |
| Voice / Chat figures and shared state | `src/components/demos/story/{Voice,Chat}Story.tsx`, `shared.tsx` |
| Editorial template (with `list` and `figure` blocks, hero slot) | `src/components/site/ArticleTemplate.tsx` |
| Card previews (CSS keyframes, paused offscreen / hidden tab) | `src/components/demos/DemoPreviews.tsx`, `.dp-*` in `src/app/globals.css` |
| Timeline controller, audio clock | `src/lib/demos/useTimeline.ts`, `useAudioClock.ts`, `audio-registry.ts`, `AudioParts.tsx` |
| Logic engines (pure functions) | `src/lib/demos/{chat-flow,voice-state}.ts` |

## Regenerating the scripted audio

Needs Node 20+, ffmpeg or lame for MP3; downloads the model once.

```bash
cd scripts/demos/audio
npm install
node generate.mjs
```

Uses `kokoro-js` with `onnx-community/Kokoro-82M-v1.0-ONNX` (q8). The model is downloaded into the build machine's Hugging Face cache and is **never served to visitors**. Each turn is synthesised separately, its real duration measured from the samples, turns joined with short gaps, and the script writes `public/demos/audio/booking-call.mp3` plus `src/content/demos/booking-call.manifest.json` (turn timings and an amplitude envelope that draws the waveform). Edit the script in `scripts/demos/audio/scripts.mjs`. If the audio cannot load, the player shows "Audio unavailable" with the transcript; it never falls back to a silent file.

## Provenance and licences

| Asset | Source | Licence |
| --- | --- | --- |
| `public/demos/audio/booking-call.mp3`, `booking-call.manifest.json` | Generated by `scripts/demos/audio/generate.mjs` with kokoro-js 1.2.1 and Kokoro-82M v1.0 (https://github.com/hexgrad/kokoro, https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX) | Apache-2.0. The script text is original to this project. |
| Chat script, booking fixtures, article text | Written for this project (`src/content/demos/`) | Original |
| Document AI results | Zryth's own published work (see the table above) | n/a |

## Verification performed

- `npx tsc --noEmit`, `eslint` and `next build`.
- Pure engines tested in Node: chat flow (including an invariant that the outage branch never yields a success state) and voice state against the real manifest at many seek points.
- Browser checks (Chromium): the three Document AI blogs on desktop and 390px mobile (no horizontal overflow, ROI figures render, the CTA carries the use case into the form, old route redirects); Voice AI playback, seeking and transcript alignment with a single audio element; Chat AI branches, the failed-action handoff and outcomes; reduced motion; no console errors.

## Known limits

- The synthesised audio was verified by duration and signal level per turn, not by listening. Please audition `booking-call.mp3` before relying on it.
- Voice AI and Chat AI are generic scenarios on sample data. They have no industry-specific results because none are published yet.
- A "tree hydrated but some attributes ... didn't match" console warning appears under `prefers-reduced-motion` on several pages (including `/about`). It comes from the existing site-wide `Reveal`/`PageHero` components.
