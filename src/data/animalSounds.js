// ── Animal sounds dataset ───────────────────────────────────────────────────
// Every entry here MUST correspond to an animal already in vocabulary.js.
// The Dharawal name is looked up from the vocabulary at build time so there is
// a single source of truth — if a Dharawal word changes there, it changes here.
//
// Only animals that make a distinctive, guessable sound are included. The
// sea creatures in the vocabulary (crab, eel, fish, octopus, oyster, shark,
// starfish, stingray, turtles) and the lizard are deliberately left out.

import { vocabulary } from './vocabulary.js';

// slug → the audio file public/sounds/<slug>.mp3 and photo public/images/vocab/<slug>.jpg
const SOUND_ANIMALS = [
  { english: 'bird',     slug: 'bird',     hint: 'A chorus of calls in the bush' },
  { english: 'dingo',    slug: 'dingo',    hint: 'A long, rising howl' },
  { english: 'echidna',  slug: 'echidna',  hint: 'Soft snuffling and grunting' },
  { english: 'emu',      slug: 'emu',      hint: 'A deep drumming boom' },
  { english: 'fly',      slug: 'fly',      hint: 'A small, busy buzzing' },
  { english: 'kangaroo', slug: 'kangaroo', hint: 'Chuffing and a thumping tail' },
  { english: 'koala',    slug: 'koala',    hint: 'A loud bellow — much deeper than you expect' },
  { english: 'lyrebird', slug: 'lyrebird', hint: 'A mimic — it copies other sounds it hears' },
  { english: 'mouse',    slug: 'mouse',    hint: 'A tiny high squeak' },
  { english: 'possum',   slug: 'possum',   hint: 'A harsh screech in the night' },
  { english: 'snake',    slug: 'snake',    hint: 'A long, dry hiss' },
];

function dharawalFor(english) {
  const entry = vocabulary.find(
    v => v.category === 'animals' && v.english.toLowerCase() === english.toLowerCase()
  );
  if (!entry) {
    // Guard against a typo silently shipping an animal that isn't in the KB.
    console.warn(`[animalSounds] "${english}" is not an animal in vocabulary.js — skipped.`);
    return null;
  }
  return entry.dharawal;
}

export const animalSounds = SOUND_ANIMALS
  .map(a => {
    const dharawal = dharawalFor(a.english);
    return dharawal ? { ...a, dharawal } : null;
  })
  .filter(Boolean);

export const soundUrl = slug => `${import.meta.env.BASE_URL}sounds/${slug}.mp3`;
export const photoUrl = slug => `${import.meta.env.BASE_URL}images/vocab/${slug}.jpg`;
