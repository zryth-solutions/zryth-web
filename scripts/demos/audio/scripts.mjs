// Source text for the scripted audio demonstrations.
// Spoken text may differ from display text where pronunciation needs help.

export const VOICES = {
  agent: "af_heart",
  customer: "am_michael",
};

export const BOOKING_CALL = {
  id: "booking-call",
  gapSeconds: 0.55,
  turns: [
    { speaker: "agent", text: "Hello, I'm Zryth's demo booking assistant. How can I help?" },
    { speaker: "customer", text: "I need to move my installation to Friday afternoon." },
    { speaker: "agent", text: "Of course. What's your booking reference?" },
    { speaker: "customer", text: "B K, two zero four eight." },
    { speaker: "agent", text: "Friday has two p.m. or four p.m. available. Which works for you?" },
    { speaker: "customer", text: "Four p.m., please." },
    { speaker: "agent", text: "Please confirm: move booking B K, two zero four eight, to Friday at four p.m.?" },
    { speaker: "customer", text: "Yes, please." },
    { speaker: "agent", text: "Your booking is updated, and I've sent your confirmation." },
  ],
};
