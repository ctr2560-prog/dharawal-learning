import { useState, useMemo } from 'react';
import { vocabulary } from '../data/vocabulary.js';
import './WorksheetBuilder.css';

const KLAS = [
  { id: 'english',  label: 'English / Literacy',  categories: ['greetings','phrases','actions','animals','body','country','sky','weather','numbers','objects','food','family','people'] },
  { id: 'maths',    label: 'Mathematics',          categories: ['numbers'] },
  { id: 'science',  label: 'Science & Technology', categories: ['animals','country','sky','weather'] },
  { id: 'hsie',     label: 'HSIE / History',       categories: ['country','people','family'] },
  { id: 'pdhpe',    label: 'PDHPE',                categories: ['body','actions'] },
];

const KLA_ACTIVITIES = {
  english: [
    { id: 'practice',     label: 'Vocabulary Practice', desc: 'Table with English, Dharawal, and a writing column' },
    { id: 'matching',     label: 'Matching Activity',   desc: 'Match letters to numbers' },
    { id: 'wordbank',     label: 'Word Bank',           desc: 'Fill in sentences using Dharawal words' },
  ],
  maths: [
    { id: 'numwords',     label: 'Number Words',        desc: 'Practise Dharawal number words alongside numerals' },
    { id: 'numsentences', label: 'Number Sentences',    desc: 'Complete addition and subtraction using Dharawal numbers' },
    { id: 'nummatching',  label: 'Numeral Match',       desc: 'Match each numeral (1, 2, 3...) to its Dharawal word' },
  ],
  science: [
    { id: 'practice',     label: 'Vocabulary Practice', desc: 'Table with English, Dharawal, and a writing column' },
    { id: 'matching',     label: 'Matching Activity',   desc: 'Match English names to Dharawal' },
    { id: 'animalsort',   label: 'Animal Sort',         desc: 'Circle the habitat and write the Dharawal name' },
  ],
  hsie: [
    { id: 'practice',     label: 'Vocabulary Practice', desc: 'Table with English, Dharawal, and a writing column' },
    { id: 'matching',     label: 'Matching Activity',   desc: 'Match English to Dharawal' },
    { id: 'wordbank',     label: 'Word Bank',           desc: 'Fill in sentences using Dharawal words' },
  ],
  pdhpe: [
    { id: 'practice',     label: 'Vocabulary Practice', desc: 'Table with English, Dharawal, and a writing column' },
    { id: 'matching',     label: 'Matching Activity',   desc: 'Match English to Dharawal' },
    { id: 'bodylabel',    label: 'Body Label Activity', desc: 'Recall and write the Dharawal word for each body part' },
  ],
};

const YEAR_GROUPS = ['K-2', '3-4', '5-6', '7-8', '9-10'];

const NUMERAL_MAP = { one: 1, two: 2, three: 3, four: 4, five: 5 };

const ANIMAL_HABITAT = {
  kangaroo: 'land', koala: 'land', echidna: 'land', dingo: 'land',
  possum: 'land', lizard: 'land', snake: 'land', mouse: 'land',
  lyrebird: 'land', emu: 'land', dog: 'land',
  fish: 'water', shark: 'water', crab: 'water', octopus: 'water',
  oyster: 'water', eel: 'water', stingray: 'water',
  'sea turtle': 'water', 'fresh water turtle': 'water',
  bird: 'sky', fly: 'sky',
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Shared ────────────────────────────────────────────────────────────────────

function SheetHeader({ meta, subtitle }) {
  return (
    <div className="ws-print__header">
      <div className="ws-print__school">Sarah Redfern High School — Ngayagang Dharawal</div>
      <h1 className="ws-print__title">{meta.klaLabel}: {subtitle}</h1>
      <div className="ws-print__meta">
        <span>Name: ___________________________</span>
        <span>Class: {meta.class || '___________'}</span>
        <span>Date: {meta.date || '___________'}</span>
        {meta.teacher && <span>Teacher: {meta.teacher}</span>}
        {meta.yearGroup && <span>Year: {meta.yearGroup}</span>}
      </div>
      {meta.topic && <p className="ws-print__topic">Topic: {meta.topic}</p>}
    </div>
  );
}

function SheetFooter() {
  return (
    <p className="ws-print__footer">
      Note: This resource uses educational vocabulary only. Dharawal language belongs to Dharawal people.
    </p>
  );
}

// ── English / Generic ─────────────────────────────────────────────────────────

function PracticeSheet({ words, meta }) {
  return (
    <div className="ws-print">
      <SheetHeader meta={meta} subtitle="Dharawal Vocabulary Practice" />
      <p className="ws-print__instruction">
        Read each English word and its Dharawal translation. Then practise writing the Dharawal word in the last column.
      </p>
      <table className="ws-print__table">
        <thead>
          <tr><th>#</th><th>English</th><th>Dharawal</th><th>Practise writing</th></tr>
        </thead>
        <tbody>
          {words.map((w, i) => (
            <tr key={w.english}>
              <td>{i + 1}</td>
              <td>{w.english}</td>
              <td className="ws-print__dharawal">{w.dharawal}</td>
              <td className="ws-print__write"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <SheetFooter />
    </div>
  );
}

function MatchingSheet({ words, meta }) {
  const rightCol = useMemo(() => shuffle([...words]), [words]);
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return (
    <div className="ws-print">
      <SheetHeader meta={meta} subtitle="Dharawal Matching Activity" />
      <p className="ws-print__instruction">
        Match each English word (left) to its Dharawal translation (right). Write the correct letter in the box.
      </p>
      <div className="ws-print__match-grid">
        <div className="ws-print__match-col">
          <div className="ws-print__match-heading">English</div>
          {words.map((w, i) => (
            <div key={w.english} className="ws-print__match-item">
              <span className="ws-print__match-num">{i + 1}.</span>
              <span className="ws-print__match-text">{w.english}</span>
              <span className="ws-print__match-box"></span>
            </div>
          ))}
        </div>
        <div className="ws-print__match-col">
          <div className="ws-print__match-heading">Dharawal</div>
          {rightCol.map((w, i) => (
            <div key={w.english} className="ws-print__match-item">
              <span className="ws-print__match-letter">{letters[i]}.</span>
              <span className="ws-print__match-text ws-print__dharawal">{w.dharawal}</span>
            </div>
          ))}
        </div>
      </div>
      <SheetFooter />
    </div>
  );
}

function WordBankSheet({ words, meta }) {
  const bank = useMemo(() => shuffle([...words]), [words]);
  return (
    <div className="ws-print">
      <SheetHeader meta={meta} subtitle="Dharawal Word Bank" />
      <p className="ws-print__instruction">
        Use the Dharawal words from the word bank to complete each sentence. Write the Dharawal word in the blank.
      </p>
      <div className="ws-print__wordbank">
        <strong>Word Bank: </strong>
        {bank.map((w, i) => (
          <span key={w.english} className="ws-print__dharawal">
            {w.dharawal}{i < bank.length - 1 ? ',  ' : ''}
          </span>
        ))}
      </div>
      <div className="ws-print__sentences">
        {words.map((w, i) => (
          <div key={w.english} className="ws-print__sentence">
            <span className="ws-print__sentence-num">{i + 1}.</span>
            <span>
              The Dharawal word for <strong>{w.english}</strong> is{' '}
              <span className="ws-print__blank">___________________</span>
            </span>
          </div>
        ))}
      </div>
      <SheetFooter />
    </div>
  );
}

// ── Maths ─────────────────────────────────────────────────────────────────────

function NumberWordsPracticeSheet({ words, meta }) {
  const numWords = words
    .map(w => ({ ...w, n: NUMERAL_MAP[w.english] }))
    .filter(w => w.n)
    .sort((a, b) => a.n - b.n);

  return (
    <div className="ws-print">
      <SheetHeader meta={meta} subtitle="Dharawal Number Words" />
      <p className="ws-print__instruction">
        Learn the Dharawal words for each number. Practise writing the Dharawal word in the last column.
      </p>
      <table className="ws-print__table">
        <thead>
          <tr><th>#</th><th>Numeral</th><th>English</th><th>Dharawal</th><th>Practise writing</th></tr>
        </thead>
        <tbody>
          {numWords.map((w, i) => (
            <tr key={w.english}>
              <td>{i + 1}</td>
              <td className="ws-print__numeral">{w.n}</td>
              <td>{w.english}</td>
              <td className="ws-print__dharawal">{w.dharawal}</td>
              <td className="ws-print__write"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <SheetFooter />
    </div>
  );
}

function NumberSentencesSheet({ words, meta }) {
  const nums = useMemo(() => (
    words
      .map(w => ({ ...w, n: NUMERAL_MAP[w.english] }))
      .filter(w => w.n)
      .sort((a, b) => a.n - b.n)
  ), [words]);

  const equations = useMemo(() => {
    const eqs = [];
    for (const a of nums) {
      for (const b of nums) {
        const r = nums.find(w => w.n === a.n + b.n);
        if (r) eqs.push({ a, b, r, op: '+' });
      }
    }
    for (const a of nums) {
      for (const b of nums) {
        if (a.n <= b.n) continue;
        const r = nums.find(w => w.n === a.n - b.n);
        if (r) eqs.push({ a, b, r, op: '-' });
      }
    }
    return shuffle(eqs).slice(0, 12);
  }, [nums]);

  return (
    <div className="ws-print">
      <SheetHeader meta={meta} subtitle="Dharawal Number Sentences" />
      <p className="ws-print__instruction">
        Complete each number sentence. Write the Dharawal word and the numeral in the answer boxes.
      </p>
      <div className="ws-print__wordbank">
        <strong>Number Word Bank: </strong>
        {nums.map((w, i) => (
          <span key={w.english}>
            <strong>{w.n}</strong> = <span className="ws-print__dharawal">{w.dharawal}</span>
            {i < nums.length - 1 ? ' ' : ''}
          </span>
        ))}
      </div>
      {equations.length === 0 ? (
        <p className="ws-print__empty-msg">Select at least two number words to generate sentences.</p>
      ) : (
        <div className="ws-print__numsentences">
          {equations.map((eq, i) => (
            <div key={i} className="ws-print__numeq">
              <span className="ws-print__numeq-num">{i + 1}.</span>
              <div className="ws-print__numeq-body">
                <div className="ws-print__numeq-row ws-print__numeq-row--dh">
                  <span className="ws-print__dharawal">{eq.a.dharawal}</span>
                  <span className="ws-print__numeq-op">{eq.op}</span>
                  <span className="ws-print__dharawal">{eq.b.dharawal}</span>
                  <span className="ws-print__numeq-op">=</span>
                  <span className="ws-print__numeq-blank"></span>
                </div>
                <div className="ws-print__numeq-row ws-print__numeq-row--num">
                  <span>{eq.a.n}</span>
                  <span className="ws-print__numeq-op">{eq.op}</span>
                  <span>{eq.b.n}</span>
                  <span className="ws-print__numeq-op">=</span>
                  <span className="ws-print__numeq-numbox"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <SheetFooter />
    </div>
  );
}

function NumeralMatchSheet({ words, meta }) {
  const numWords = useMemo(() => (
    words
      .map(w => ({ ...w, n: NUMERAL_MAP[w.english] }))
      .filter(w => w.n)
      .sort((a, b) => a.n - b.n)
  ), [words]);
  const rightCol = useMemo(() => shuffle([...numWords]), [numWords]);
  const letters = 'abcdefghijklmnopqrstuvwxyz';

  return (
    <div className="ws-print">
      <SheetHeader meta={meta} subtitle="Dharawal Numeral Match" />
      <p className="ws-print__instruction">
        Match each numeral (left) to the correct Dharawal number word (right). Write the letter in the box.
      </p>
      <div className="ws-print__match-grid">
        <div className="ws-print__match-col">
          <div className="ws-print__match-heading">Numeral</div>
          {numWords.map((w, i) => (
            <div key={w.english} className="ws-print__match-item">
              <span className="ws-print__match-num">{i + 1}.</span>
              <span className="ws-print__match-text ws-print__numeral ws-print__numeral--lg">{w.n}</span>
              <span className="ws-print__match-box"></span>
            </div>
          ))}
        </div>
        <div className="ws-print__match-col">
          <div className="ws-print__match-heading">Dharawal</div>
          {rightCol.map((w, i) => (
            <div key={w.english} className="ws-print__match-item">
              <span className="ws-print__match-letter">{letters[i]}.</span>
              <span className="ws-print__match-text ws-print__dharawal">{w.dharawal}</span>
            </div>
          ))}
        </div>
      </div>
      <SheetFooter />
    </div>
  );
}

// ── Science ───────────────────────────────────────────────────────────────────

function AnimalSortSheet({ words, meta }) {
  const animals = useMemo(() => shuffle(words.filter(w => w.category === 'animals')), [words]);

  return (
    <div className="ws-print">
      <SheetHeader meta={meta} subtitle="Dharawal Animal Sort" />
      <p className="ws-print__instruction">
        For each animal: (1) circle whether it lives on land, in water, or in the sky; then (2) write its Dharawal name in the blank.
      </p>
      {animals.length === 0 ? (
        <p className="ws-print__empty-msg">Select animal vocabulary to use this activity.</p>
      ) : (
        <table className="ws-print__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Animal</th>
              <th>Habitat (circle one)</th>
              <th>Dharawal name</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((w, i) => (
              <tr key={w.english}>
                <td>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{w.english}</td>
                <td className="ws-print__habitat">Land &nbsp;&nbsp;&nbsp; Water &nbsp;&nbsp;&nbsp; Sky</td>
                <td className="ws-print__write"></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <SheetFooter />
    </div>
  );
}

// ── PDHPE ─────────────────────────────────────────────────────────────────────

function BodyLabelSheet({ words, meta }) {
  const bodyWords = words.filter(w => w.category === 'body');
  const bank = useMemo(() => shuffle([...bodyWords]), [bodyWords]);

  return (
    <div className="ws-print">
      <SheetHeader meta={meta} subtitle="Dharawal Body Parts" />
      <p className="ws-print__instruction">
        Write the Dharawal word for each body part. Use the word bank to help you. Then point to each body part and say it aloud in Dharawal!
      </p>
      {bodyWords.length === 0 ? (
        <p className="ws-print__empty-msg">Select body part vocabulary to use this activity.</p>
      ) : (
        <>
          <div className="ws-print__wordbank">
            <strong>Word Bank: </strong>
            {bank.map((w, i) => (
              <span key={w.english} className="ws-print__dharawal">
                {w.dharawal}{i < bank.length - 1 ? ',  ' : ''}
              </span>
            ))}
          </div>
          <table className="ws-print__table">
            <thead>
              <tr><th>#</th><th>Body Part (English)</th><th>Dharawal word</th><th>Practise writing</th></tr>
            </thead>
            <tbody>
              {bodyWords.map((w, i) => (
                <tr key={w.english}>
                  <td>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{w.english}</td>
                  <td className="ws-print__write"></td>
                  <td className="ws-print__write"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <SheetFooter />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function WorksheetBuilder({ onBack }) {
  const [kla, setKla] = useState('english');
  const [activityType, setActivityType] = useState('practice');
  const [selected, setSelected] = useState(new Set());
  const [meta, setMeta] = useState({ teacher: '', class: '', date: '', yearGroup: '', topic: '' });

  const klaObj = KLAS.find(k => k.id === kla);
  const pool = vocabulary.filter(w => klaObj.categories.includes(w.category));
  const selectedWords = vocabulary.filter(w => selected.has(w.english));

  function toggleWord(english) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(english) ? next.delete(english) : next.add(english);
      return next;
    });
  }

  function selectAll() { setSelected(new Set(pool.map(w => w.english))); }
  function clearAll() { setSelected(new Set()); }

  function handleKlaChange(id) {
    setKla(id);
    setSelected(new Set());
    setActivityType(KLA_ACTIVITIES[id][0].id);
  }

  const metaWithLabel = { ...meta, klaLabel: klaObj.label };

  function renderSheet() {
    const props = { words: selectedWords, meta: metaWithLabel };
    switch (activityType) {
      case 'practice':     return <PracticeSheet {...props} />;
      case 'matching':     return <MatchingSheet {...props} />;
      case 'wordbank':     return <WordBankSheet {...props} />;
      case 'numwords':     return <NumberWordsPracticeSheet {...props} />;
      case 'numsentences': return <NumberSentencesSheet {...props} />;
      case 'nummatching':  return <NumeralMatchSheet {...props} />;
      case 'animalsort':   return <AnimalSortSheet {...props} />;
      case 'bodylabel':    return <BodyLabelSheet {...props} />;
      default:             return <PracticeSheet {...props} />;
    }
  }

  return (
    <div className="wsb">
      <div className="wsb__header">
        <button className="wsb__back" onClick={onBack}>‹</button>
        <div>
          <h2 className="wsb__title">Worksheet Builder</h2>
          <p className="wsb__sub">Configure your worksheet, then print</p>
        </div>
        <button
          className="wsb__print-btn"
          onClick={() => window.print()}
          disabled={selectedWords.length === 0}
        >
          Print Worksheet
        </button>
      </div>

      <div className="wsb__layout">
        <div className="wsb__controls">

          <section className="wsb__section">
            <h3 className="wsb__section-title">Key Learning Area</h3>
            <div className="wsb__kla-list">
              {KLAS.map(k => (
                <button
                  key={k.id}
                  className={`wsb__kla-btn ${kla === k.id ? 'wsb__kla-btn--active' : ''}`}
                  onClick={() => handleKlaChange(k.id)}
                >
                  {k.label}
                </button>
              ))}
            </div>
          </section>

          <section className="wsb__section">
            <h3 className="wsb__section-title">Activity Type</h3>
            <div className="wsb__type-list">
              {KLA_ACTIVITIES[kla].map(t => (
                <button
                  key={t.id}
                  className={`wsb__type-btn ${activityType === t.id ? 'wsb__type-btn--active' : ''}`}
                  onClick={() => setActivityType(t.id)}
                >
                  <span className="wsb__type-label">{t.label}</span>
                  <span className="wsb__type-desc">{t.desc}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="wsb__section">
            <div className="wsb__section-header">
              <h3 className="wsb__section-title">Vocabulary ({selected.size} selected)</h3>
              <div className="wsb__vocab-actions">
                <button className="wsb__tiny-btn" onClick={selectAll}>All</button>
                <button className="wsb__tiny-btn" onClick={clearAll}>None</button>
              </div>
            </div>
            <div className="wsb__vocab-list">
              {pool.map(w => (
                <label key={w.english} className="wsb__vocab-item">
                  <input
                    type="checkbox"
                    checked={selected.has(w.english)}
                    onChange={() => toggleWord(w.english)}
                  />
                  <span className="wsb__vocab-en">{w.english}</span>
                  <span className="wsb__vocab-dh">{w.dharawal}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="wsb__section">
            <h3 className="wsb__section-title">Worksheet Details</h3>
            <div className="wsb__fields">
              <label className="wsb__field">
                <span>Teacher name</span>
                <input value={meta.teacher} onChange={e => setMeta(m => ({ ...m, teacher: e.target.value }))} placeholder="Ms Smith" />
              </label>
              <label className="wsb__field">
                <span>Class</span>
                <input value={meta.class} onChange={e => setMeta(m => ({ ...m, class: e.target.value }))} placeholder="7B" />
              </label>
              <label className="wsb__field">
                <span>Year group</span>
                <select value={meta.yearGroup} onChange={e => setMeta(m => ({ ...m, yearGroup: e.target.value }))}>
                  <option value="">Select</option>
                  {YEAR_GROUPS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </label>
              <label className="wsb__field">
                <span>Date</span>
                <input type="date" value={meta.date} onChange={e => setMeta(m => ({ ...m, date: e.target.value }))} />
              </label>
              <label className="wsb__field wsb__field--full">
                <span>Topic / Unit</span>
                <input value={meta.topic} onChange={e => setMeta(m => ({ ...m, topic: e.target.value }))} placeholder="e.g. Animals of Dharawal Country" />
              </label>
            </div>
          </section>
        </div>

        <div className="wsb__preview-panel">
          <div className="wsb__preview-label">Preview</div>
          {selectedWords.length === 0 ? (
            <div className="wsb__preview-empty">
              Select vocabulary from the left to preview your worksheet
            </div>
          ) : (
            <div className="wsb__preview-scroll">
              {renderSheet()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
