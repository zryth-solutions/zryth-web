/** Voice AI demo fixtures: a sample booking and a generic list of Friday slots. */

export const BOOKING = {
  ref: "BK-2048",
  service: "Installation (sample)",
  customer: "Sample customer",
  before: "Wednesday, 10:00 a.m.",
  after: "Friday, 4:00 p.m.",
};

export const FRIDAY_SLOTS = [
  { time: "1:00 p.m.", available: false },
  { time: "2:00 p.m.", available: true },
  { time: "3:00 p.m.", available: false },
  { time: "4:00 p.m.", available: true },
];

export const SELECTED_SLOT = "4:00 p.m.";

export const CONNECTORS = ["Booking system", "Customer records", "Customer messaging"];

export const UNAVAILABLE_NOTE =
  "The scripted recording could not be loaded. It is generated at build time: run `node generate.mjs` in scripts/demos/audio (see docs/case-study-demos.md). The transcript below is the script.";
