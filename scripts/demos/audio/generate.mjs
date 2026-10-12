#!/usr/bin/env node
/**
 * Generates the scripted demonstration audio with Kokoro (Apache-2.0).
 *
 *   cd scripts/demos/audio && npm install && node generate.mjs
 *
 * - Model: onnx-community/Kokoro-82M-v1.0-ONNX, downloaded by kokoro-js into the
 *   local Hugging Face cache on the build machine. It is NOT served to visitors.
 * - Each turn is synthesised separately, its real duration is measured from the
 *   sample count, turns are joined with short silences, and a timing manifest is
 *   written. The site reads audio.currentTime against that manifest.
 * - Output: public/demos/audio/<id>.mp3 and src/content/demos/<id>.manifest.json.
 *   The manifest also carries an amplitude envelope (`peaks`, one value per
 *   PEAK_STEP seconds, measured from the real samples) used to draw the waveform.
 * - MP3 encoding uses ffmpeg (or lame) if present; otherwise the WAV is served.
 *
 * This is scripted synthesized speech, not a recording of a live agent.
 */
import { KokoroTTS } from "kokoro-js";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { VOICES, BOOKING_CALL } from "./scripts.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../..");
const audioDir = path.join(root, "public/demos/audio");
const manifestDir = path.join(root, "src/content/demos");
mkdirSync(audioDir, { recursive: true });
mkdirSync(manifestDir, { recursive: true });

const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";
const PEAK_STEP = 0.1;
const tmpDir = path.join(os.tmpdir(), "zryth-demo-audio");
mkdirSync(tmpDir, { recursive: true });

function envelope(samples, sampleRate) {
  const win = Math.round(PEAK_STEP * sampleRate);
  const out = [];
  for (let i = 0; i < samples.length; i += win) {
    let sum = 0;
    const end = Math.min(i + win, samples.length);
    for (let j = i; j < end; j++) sum += samples[j] * samples[j];
    out.push(Math.sqrt(sum / (end - i)));
  }
  const max = Math.max(...out, 1e-9);
  return out.map((v) => Number((v / max).toFixed(2)));
}

function wavBuffer(samples, sampleRate) {
  const bytes = samples.length * 2;
  const buf = Buffer.alloc(44 + bytes);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + bytes, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(bytes, 40);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE(Math.round(s < 0 ? s * 0x8000 : s * 0x7fff), 44 + i * 2);
  }
  return buf;
}

function which(cmd) {
  try {
    execFileSync("which", [cmd], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

console.log(`Loading ${MODEL_ID} (first run downloads the model)...`);
const tts = await KokoroTTS.from_pretrained(MODEL_ID, { dtype: "q8", device: "cpu" });

async function build(script) {
  let sampleRate = 24000;
  const chunks = [];
  const turns = [];
  let cursor = 0; // in samples
  for (let i = 0; i < script.turns.length; i++) {
    const turn = script.turns[i];
    const voice = VOICES[turn.speaker];
    process.stdout.write(`  [${script.id}] ${i + 1}/${script.turns.length} ${turn.speaker} (${voice})... `);
    const out = await tts.generate(turn.text, { voice });
    sampleRate = out.sampling_rate;
    const samples = out.audio;
    const start = cursor / sampleRate;
    cursor += samples.length;
    const end = cursor / sampleRate;
    chunks.push(samples);
    turns.push({
      index: i,
      speaker: turn.speaker,
      voice,
      text: turn.text,
      start: Number(start.toFixed(3)),
      end: Number(end.toFixed(3)),
    });
    console.log(`${(end - start).toFixed(2)}s`);
    if (i < script.turns.length - 1) {
      const gap = new Float32Array(Math.round(script.gapSeconds * sampleRate));
      chunks.push(gap);
      cursor += gap.length;
    }
  }
  const all = new Float32Array(cursor);
  let o = 0;
  for (const c of chunks) {
    all.set(c, o);
    o += c.length;
  }
  const wavPath = path.join(tmpDir, `${script.id}.wav`);
  writeFileSync(wavPath, wavBuffer(all, sampleRate));

  let file = `${script.id}.wav`;
  if (!which("ffmpeg") && !which("lame")) {
    writeFileSync(path.join(audioDir, file), wavBuffer(all, sampleRate));
  }
  if (which("ffmpeg")) {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wavPath, "-codec:a", "libmp3lame", "-b:a", "64k", "-ac", "1", path.join(audioDir, `${script.id}.mp3`)]);
    file = `${script.id}.mp3`;
  } else if (which("lame")) {
    execFileSync("lame", ["--quiet", "-b", "64", "-m", "m", wavPath, path.join(audioDir, `${script.id}.mp3`)]);
    file = `${script.id}.mp3`;
  }

  const manifest = {
    id: script.id,
    generatedBy: `kokoro-js ${MODEL_ID} (q8)`,
    note: "Scripted audio demonstration. Synthesised speech, not a live agent.",
    file: `/demos/audio/${file}`,
    sampleRate,
    duration: Number((cursor / sampleRate).toFixed(3)),
    peakStep: PEAK_STEP,
    peaks: envelope(all, sampleRate),
    turns,
  };
  writeFileSync(path.join(manifestDir, `${script.id}.manifest.json`), JSON.stringify(manifest, null, 2) + "\n");
  rmSync(wavPath, { force: true });
  console.log(`  [${script.id}] wrote ${file}, ${manifest.duration}s total`);
}

await build(BOOKING_CALL);
console.log("Done.");
