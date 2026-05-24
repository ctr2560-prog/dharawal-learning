// ── Vocabulary dataset ──────────────────────────────────────────────────────
// Categories align with the app knowledge base spec.
// Multi-word phrases (e.g. "fresh water turtle") must be matched BEFORE
// individual words — the translation engine handles this automatically.

export const vocabulary = [
  // Greetings & phrases
  { english: "hello",              dharawal: "naggangbi",       category: "greetings", notes: "Greeting." },
  { english: "bye",                dharawal: "nandawabi",       category: "greetings", notes: "Farewell." },
  { english: "I am",               dharawal: "ngayagang",       category: "phrases",   notes: "Also used for 'my name is'." },
  { english: "my name is",         dharawal: "ngayagang",       category: "phrases",   notes: "Can be followed by a person's name." },

  // Family & people
  { english: "uncle",              dharawal: "Mabarraa",        category: "family",    notes: "Kinship term." },
  { english: "husband",            dharawal: "dhullai murra",   category: "family" },
  { english: "brother",            dharawal: "banda murra",     category: "family" },
  { english: "man",                dharawal: "dhullai",         category: "people" },
  { english: "boy",                dharawal: "banda",           category: "people" },

  // Animals — listed longest-phrase first to assist matching
  { english: "fresh water turtle", dharawal: "bilima",          category: "animals" },
  { english: "sea turtle",         dharawal: "gudhamaang",      category: "animals" },
  { english: "bird",               dharawal: "budjaan",         category: "animals" },
  { english: "crab",               dharawal: "gariga",          category: "animals" },
  { english: "dingo",              dharawal: "warrigal",        category: "animals" },
  { english: "dog",                dharawal: "mirrgaang",       category: "animals" },
  { english: "echidna",            dharawal: "gunninggwirr",    category: "animals" },
  { english: "eel",                dharawal: "bara",            category: "animals" },
  { english: "emu",                dharawal: "biraban",         category: "animals" },
  { english: "fish",               dharawal: "dhanj",           category: "animals" },
  { english: "kangaroo",           dharawal: "buru",            category: "animals" },
  { english: "koala",              dharawal: "kooala",          category: "animals" },
  { english: "lizard",             dharawal: "magadaang",       category: "animals" },
  { english: "lyrebird",           dharawal: "kalboonya",       category: "animals" },
  { english: "mouse",              dharawal: "bugalaa",         category: "animals" },
  { english: "octopus",            dharawal: "djungaa",         category: "animals" },
  { english: "oyster",             dharawal: "bidhiinja",       category: "animals" },
  { english: "possum",             dharawal: "guruwara",        category: "animals" },
  { english: "shark",              dharawal: "yanaga",          category: "animals" },
  { english: "snake",              dharawal: "garri",           category: "animals" },
  { english: "starfish",           dharawal: "gunaagaan",       category: "animals" },
  { english: "stingray",           dharawal: "girawaa",         category: "animals" },
  { english: "fly",                dharawal: "mirang",          category: "animals",   notes: "Can also mean the action 'to fly'." },

  // Body parts
  { english: "ear",                dharawal: "guri",            category: "body" },
  { english: "eye",                dharawal: "mii",             category: "body" },
  { english: "fingers",            dharawal: "maramal",         category: "body" },
  { english: "foot",               dharawal: "dhana",           category: "body" },
  { english: "hand",               dharawal: "mara",            category: "body" },
  { english: "head",               dharawal: "walar",           category: "body" },
  { english: "knee",               dharawal: "ngumu",           category: "body" },
  { english: "leg",                dharawal: "dhara",           category: "body" },
  { english: "mouth",              dharawal: "gami",            category: "body" },
  { english: "nose",               dharawal: "nugar",           category: "body" },
  { english: "shoulder",           dharawal: "gugu",            category: "body" },
  { english: "stomach",            dharawal: "bindjil",         category: "body" },
  { english: "teeth",              dharawal: "yira",            category: "body" },
  { english: "toes",               dharawal: "mandawi",         category: "body" },
  { english: "tongue",             dharawal: "dhalanj",         category: "body" },
  { english: "cough",              dharawal: "gadhaba",         category: "body",      notes: "Body action." },

  // Country, land, water & sky
  { english: "beach",              dharawal: "wadjiid",         category: "country" },
  { english: "cave",               dharawal: "yarra",           category: "country" },
  { english: "grass",              dharawal: "bamburr",         category: "country" },
  { english: "island",             dharawal: "barangga",        category: "country" },
  { english: "river",              dharawal: "dharaggang",      category: "country" },
  { english: "rock",               dharawal: "gurabang",        category: "country" },
  { english: "tree",               dharawal: "gundhu",          category: "country" },
  { english: "water",              dharawal: "ngadjung",        category: "country" },
  { english: "place",              dharawal: "nura",            category: "country",   notes: "Nura can mean place, land, or home depending on context." },
  { english: "land",               dharawal: "nura",            category: "country",   notes: "Nura can mean place, land, or home depending on context." },
  { english: "home",               dharawal: "nura",            category: "country",   notes: "Nura can mean place, land, or home depending on context." },
  { english: "moon",               dharawal: "djadju",          category: "sky" },
  { english: "sun",                dharawal: "wuri",            category: "sky" },
  { english: "rain",               dharawal: "bana",            category: "weather" },

  // Actions
  { english: "catch",              dharawal: "mandha",          category: "actions" },
  { english: "cry",                dharawal: "dhungga",         category: "actions" },
  { english: "drink",              dharawal: "njunda",          category: "actions" },
  { english: "eat",                dharawal: "dhanma",          category: "actions" },

  // Objects & food
  { english: "bag",                dharawal: "gaarma",          category: "objects" },
  { english: "hat",                dharawal: "dhanbaa",         category: "objects" },
  { english: "food",               dharawal: "dhanang",         category: "food" },

  // Numbers
  { english: "one",                dharawal: "midhang",         category: "numbers" },
  { english: "two",                dharawal: "bularr",          category: "numbers" },
  { english: "three",              dharawal: "bularra midhang", category: "numbers" },
  { english: "four",               dharawal: "bularra bullarra", category: "numbers" },
  { english: "five",               dharawal: "bula bula midha", category: "numbers" },
];

// ── Cultural content ─────────────────────────────────────────────────────────

export const CULTURAL = {
  disclaimer: "This app provides a limited educational vocabulary for learning purposes. Dharawal language and cultural knowledge belong to Dharawal people. For formal, public, commercial, or cultural use, please seek guidance from Dharawal community representatives, language custodians, or approved sources.",

  whaleDreaming: "The Whale Dreaming story is a significant cultural narrative of the Dharawal people. It tells of Burri Burri, a giant Dharawal man, who is tricked and transforms into a whale. The story also includes transformations of other characters into beings such as a koala, a crane, and an island. These transformations connect animals, landforms, sea Country, and spiritual knowledge. The story reflects a Dharawal worldview in which Country, sea, animals, people, and spirit are deeply connected.",

  dharawalPeople: "The Dharawal people are the traditional custodians of coastal Country south of Sydney, from the Georges River to the Shoalhaven River. Their Country includes areas now known as Wollongong, Campbelltown, and the Royal National Park.\n\nThe Dharawal language was spoken across this beautiful coastal region for tens of thousands of years. Today, Dharawal people continue to maintain their connection to Country, culture, and language.",

  lyrebird: "The lyrebird (Kalboonya in Dharawal) is a very special bird in Dharawal Country. Known for its extraordinary ability to mimic sounds, the lyrebird is a messenger and connector.\n\n\"Land of the Lyrebird\" translates to \"Nura Kalboonya\": Nura meaning land, place, or home, and Kalboonya meaning lyrebird. Sarah Redfern High School sits on this Country.",

  sentenceWarning: "Note: This is a word-by-word translation only, not a full grammatical sentence translation. Dharawal grammar and sentence structure may differ from English.",
};

// ── Blocked content ──────────────────────────────────────────────────────────
const BLOCKED = ['bullshit', 'shit', 'fuck', 'cunt', 'bitch', 'arse', 'arsehole', 'bastard', 'damn', 'crap'];
const BLOCKED_RESPONSE = "This app does not translate swear words or crude language.";

// ── Translation engine ───────────────────────────────────────────────────────

function normalise(str) {
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

function formatEntry(entry) {
  let out = `Dharawal: ${entry.dharawal}\nEnglish: ${entry.english}\nCategory: ${entry.category}`;
  if (entry.notes) out += `\n\nNote: ${entry.notes}`;
  return out;
}

// Translate a specific term (English → Dharawal)
function translateTerm(term, vocab) {
  const norm = normalise(term);

  // Exact phrase match
  const exact = vocab.find(v => normalise(v.english) === norm);
  if (exact) {
    // Check if multiple English words share this Dharawal word (e.g. nura)
    const shared = vocab.filter(v => v.dharawal === exact.dharawal);
    if (shared.length > 1) {
      const meanings = shared.map(v => v.english).join(', ');
      return `Dharawal: ${exact.dharawal}\nEnglish: ${exact.english}\nCategory: ${exact.category}\n\nNote: "${exact.dharawal}" can mean ${meanings}, depending on context.`;
    }
    return formatEntry(exact);
  }

  // Partial match on multi-word input
  const partial = vocab.filter(v => normalise(v.english).includes(norm) && norm.length >= 3);
  if (partial.length === 1) return formatEntry(partial[0]);
  if (partial.length > 1) {
    const list = partial.slice(0, 6).map(v => `• ${v.english} → ${v.dharawal}`).join('\n');
    return `Here are words matching "${term}":\n\n${list}`;
  }

  // Word-by-word fallback for multi-word input
  if (norm.includes(' ')) {
    const words = norm.split(' ');
    const results = words.map(w => {
      const m = vocab.find(v => normalise(v.english) === w);
      return m ? m.dharawal : `[${w}: no translation available]`;
    });
    const hasAny = results.some(r => !r.startsWith('['));
    if (hasAny) {
      return `Word-by-word translation:\n${results.join(' ')}\n\n${CULTURAL.sentenceWarning}`;
    }
  }

  return `No confirmed Dharawal translation is available in this app for "${term}".`;
}

// Look up a term in either direction (English or Dharawal)
function lookupTerm(term, vocab) {
  const norm = normalise(term);

  // Dharawal → English
  const dharawalMatches = vocab.filter(v => v.dharawal.toLowerCase() === norm);
  if (dharawalMatches.length === 1) {
    return `"${dharawalMatches[0].dharawal}" means "${dharawalMatches[0].english}" in English.\nCategory: ${dharawalMatches[0].category}`;
  }
  if (dharawalMatches.length > 1) {
    const meanings = dharawalMatches.map(v => v.english).join(', ');
    return `"${dharawalMatches[0].dharawal}" can mean: ${meanings} (depending on context).`;
  }

  // English → Dharawal
  const engMatch = vocab.find(v => normalise(v.english) === norm);
  if (engMatch) return formatEntry(engMatch);

  return `I could not find "${term}" in the vocabulary. Try searching by English word (e.g. "translate dog") or Dharawal word (e.g. "what does mirrgaang mean?").`;
}

// ── Main chatbot function ────────────────────────────────────────────────────

export function processMessage(input, vocab) {
  const raw = input.trim();
  if (!raw) return "Please enter an English word or simple phrase.";

  const msg = normalise(raw);

  // 1. Blocked content
  if (BLOCKED.some(b => msg.includes(b))) return BLOCKED_RESPONSE;

  // 2. Greetings
  if (['hello', 'hi', 'hey', 'naggangbi', "g'day"].includes(msg) || msg.startsWith('hello ') || msg.startsWith('hi ')) {
    return "Naggangbi! (Hello!) I'm your Dharawal language guide.\n\nI can help you:\n• Translate words, e.g. \"translate kangaroo\"\n• Look up Dharawal words, e.g. \"what does buru mean?\"\n• Browse categories, e.g. \"show me animal words\"\n• Learn about Dharawal culture and Country";
  }

  // 3. Goodbye
  if (['bye', 'goodbye', 'nandawabi', 'see ya'].includes(msg)) {
    return "Nandawabi! (Goodbye!) Keep practising your Dharawal. You're doing great!";
  }

  // 4. Help
  if (msg === 'help' || msg === 'what can you do' || msg.startsWith('how do i use')) {
    return "Here's what I can help with:\n\n• \"translate [word]\", e.g. translate shark\n• \"what does [word] mean?\", e.g. what does yanaga mean\n• \"how do you say [word]?\", e.g. how do you say sun\n• \"show me [category] words\": animals, body, country, sky, numbers, family\n• \"tell me about the Dharawal people\"\n• \"tell me the Whale Dreaming story\"\n• \"what is the cultural disclaimer?\"\n\nType any English word or Dharawal word and I'll look it up.";
  }

  // 5. Explicit translation request patterns
  const translatePatterns = [
    /^(?:translate|how do (?:i|you) say|say) (.+?)(?:\s+in dharawal)?[?]?$/,
    /^what(?:'s| is) (.+?) in dharawal[?]?$/,
    /^dharawal (?:word )?for (.+)[?]?$/,
  ];
  for (const pat of translatePatterns) {
    const m = msg.match(pat);
    if (m) return translateTerm(m[1].trim(), vocab);
  }

  // 6. Meaning / lookup request patterns (bidirectional)
  const meaningPatterns = [
    /^what(?:'s| is| does) (.+?) mean[?]?$/,
    /^meaning of (.+)[?]?$/,
  ];
  for (const pat of meaningPatterns) {
    const m = msg.match(pat);
    if (m) return lookupTerm(m[1].trim(), vocab);
  }

  // 7. Category browsing
  const CAT_MAP = {
    animal: 'animals', animals: 'animals',
    bird: 'animals', fish: 'animals', sea: 'animals',
    body: 'body', 'body part': 'body', 'body parts': 'body',
    country: 'country', nature: 'country', land: 'country', environment: 'country',
    sky: 'sky', weather: 'weather',
    number: 'numbers', numbers: 'numbers', count: 'numbers', counting: 'numbers',
    family: 'family', people: 'people', person: 'people',
    greet: 'greetings', greeting: 'greetings', greetings: 'greetings',
    action: 'actions', actions: 'actions', verb: 'actions',
    object: 'objects', objects: 'objects',
    food: 'food', phrase: 'phrases', phrases: 'phrases',
  };
  for (const [key, cat] of Object.entries(CAT_MAP)) {
    if (msg.includes(key)) {
      const words = vocab.filter(v => v.category === cat);
      if (words.length === 0) continue;
      const list = words.map(w => `• ${w.english} → ${w.dharawal}`).join('\n');
      return `Dharawal ${cat} words:\n\n${list}`;
    }
  }

  // 8. Cultural knowledge
  if (msg.includes('whale') || msg.includes('dreaming story') || msg.includes('burri')) {
    return CULTURAL.whaleDreaming;
  }
  if (msg.includes('dharawal people') || msg.includes('who are') || msg.includes('about dharawal') || msg.includes('dharawal nation')) {
    return CULTURAL.dharawalPeople;
  }
  if (msg.includes('lyrebird') || msg.includes('kalboonya')) {
    return CULTURAL.lyrebird;
  }
  if (msg.includes('disclaimer') || msg.includes('permission') || msg.includes('copyright') || msg.includes('acknowledge')) {
    return CULTURAL.disclaimer;
  }
  if (msg.includes('nura kalboonya') || msg.includes('sarah redfern')) {
    return "Sarah Redfern High School sits on Dharawal Country, Nura Kalboonya, the Land of the Lyrebird. The school honours this Country by learning the Dharawal language.";
  }

  // 9. Word of all / full list
  if (msg.includes('all words') || msg.includes('full list') || msg.includes('all vocabulary')) {
    const sample = vocab.slice(0, 12).map(v => `• ${v.english} → ${v.dharawal}`).join('\n');
    return `I know ${vocab.length} Dharawal words. Here are some examples:\n\n${sample}\n\n...and many more! Ask for a category like "show me animal words" or "show me body words".`;
  }

  // 10. Direct lookup — exact match in either direction (whole message as search)
  const directDharawal = vocab.filter(v => v.dharawal.toLowerCase() === msg);
  if (directDharawal.length === 1) {
    return lookupTerm(msg, vocab);
  }
  if (directDharawal.length > 1) {
    const meanings = directDharawal.map(v => v.english).join(', ');
    return `"${directDharawal[0].dharawal}" can mean: ${meanings} (depending on context).`;
  }

  const directEnglish = vocab.find(v => normalise(v.english) === msg);
  if (directEnglish) return formatEntry(directEnglish);

  // 11. Multi-word input — try word-by-word translation
  if (msg.includes(' ')) {
    const words = msg.split(' ');
    const results = words.map(w => {
      const m = vocab.find(v => normalise(v.english) === w);
      return m ? m.dharawal : `[${w}: no translation available]`;
    });
    const hasAny = results.some(r => !r.startsWith('['));
    if (hasAny) {
      return `Word-by-word translation:\n${results.join(' ')}\n\n${CULTURAL.sentenceWarning}`;
    }
  }

  // 12. Not found
  return `No confirmed Dharawal translation is available in this app for "${raw}".\n\nTry:\n• "translate [word]", e.g. translate dog\n• "what does [word] mean?", e.g. what does mirrgaang mean\n• "show me animal words" to browse the vocabulary`;
}
