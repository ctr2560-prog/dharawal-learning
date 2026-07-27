import { useState, useEffect, useRef, useMemo } from 'react';
import { animalSounds, soundUrl, photoUrl } from '../data/animalSounds.js';
import './AnimalSounds.css';

const ROUNDS = 8;

function pickOptions(correct, pool) {
  const wrong = [...pool]
    .filter(a => a.english !== correct.english)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return [...wrong, correct].sort(() => Math.random() - 0.5);
}

export default function AnimalSounds({ onBack }) {
  // 'checking' → preflight for which sound files exist
  // 'setup'    → no sound files present yet
  // 'ready' | 'playing' | 'end'
  const [phase, setPhase] = useState('checking');
  const [available, setAvailable] = useState([]);
  const [round, setRound] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);   // the option the student chose
  const [flipped, setFlipped] = useState(false); // reveal card shows Dharawal
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const audioRef = useRef(null);

  const current = round[idx];
  const options = useMemo(
    () => (current ? pickOptions(current, available) : []),
    [current, available]
  );

  // ── Preflight: which sound files have actually been added? ────────────────
  useEffect(() => {
    let cancelled = false;
    // NOTE: a plain r.ok check is not enough. Dev servers and SPA hosts often
    // serve index.html (HTTP 200, Content-Type: text/html) for a missing file,
    // which would be a false positive. Require an audio content-type.
    Promise.all(
      animalSounds.map(a =>
        fetch(soundUrl(a.slug), { method: 'HEAD' })
          .then(r => {
            const type = r.headers.get('content-type') || '';
            return r.ok && type.includes('audio') ? a : null;
          })
          .catch(() => null)
      )
    ).then(results => {
      if (cancelled) return;
      const ok = results.filter(Boolean);
      setAvailable(ok);
      setPhase(ok.length >= 4 ? 'ready' : 'setup');
    });
    return () => { cancelled = true; };
  }, []);

  // Stop any audio when leaving the screen
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  function playSound() {
    if (!current) return;
    audioRef.current?.pause();
    const audio = new Audio(soundUrl(current.slug));
    audioRef.current = audio;
    setPlaying(true);
    audio.onended = () => setPlaying(false);
    audio.onerror = () => setPlaying(false);
    audio.play().catch(() => setPlaying(false));
  }

  function startGame() {
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    setRound(shuffled.slice(0, Math.min(ROUNDS, shuffled.length)));
    setIdx(0);
    setScore(0);
    setPicked(null);
    setFlipped(false);
    setShowHint(false);
    setPhase('playing');
  }

  // Auto-play the sound when a new animal comes up
  useEffect(() => {
    if (phase !== 'playing' || !current) return;
    const t = setTimeout(playSound, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, idx, current?.slug]);

  function answer(option) {
    if (picked) return;
    audioRef.current?.pause();
    setPlaying(false);
    setPicked(option);
    if (option.english === current.english) setScore(s => s + 1);
  }

  function next() {
    audioRef.current?.pause();
    setPlaying(false);
    setPicked(null);
    setFlipped(false);
    setShowHint(false);
    if (idx + 1 >= round.length) setPhase('end');
    else setIdx(i => i + 1);
  }

  const header = (
    <div className="asnd__header">
      <button className="asnd__back" onClick={onBack}>‹</button>
      <h2 className="asnd__title">Guess the Animal Sound</h2>
      {phase === 'playing' && <div className="asnd__live-score">{score}</div>}
    </div>
  );

  // ── No sounds added yet ───────────────────────────────────────────────────
  if (phase === 'checking') {
    return (
      <div className="asnd">
        {header}
        <div className="asnd__center">
          <p className="asnd__muted">Loading sounds…</p>
        </div>
      </div>
    );
  }

  if (phase === 'setup') {
    return (
      <div className="asnd">
        {header}
        <div className="asnd__center">
          <div className="asnd__setup">
            <h3 className="asnd__setup-heading">Sound files not added yet</h3>
            <p className="asnd__setup-text">
              This game needs audio recordings. Add MP3 files to the{' '}
              <code>public/sounds/</code> folder using these exact names, then
              reload the page. You need at least four to play.
            </p>
            <ul className="asnd__setup-list">
              {animalSounds.map(a => {
                const has = available.some(x => x.slug === a.slug);
                return (
                  <li key={a.slug} className={has ? 'asnd__setup-has' : ''}>
                    <code>{a.slug}.mp3</code>
                    <span>{a.english} — {a.dharawal}</span>
                    {has && <strong>added</strong>}
                  </li>
                );
              })}
            </ul>
          </div>
          <button className="asnd__menu-btn" onClick={onBack}>Back to Menu</button>
        </div>
      </div>
    );
  }

  // ── Ready ─────────────────────────────────────────────────────────────────
  if (phase === 'ready') {
    return (
      <div className="asnd">
        {header}
        <div className="asnd__center">
          <div className="asnd__ear">
            <svg viewBox="0 0 60 60" fill="none">
              <path d="M30 52 C30 44 36 42 36 34 C36 27 31 24 26 26" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M18 34 C18 21 27 13 38 15" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M44 12 C50 18 50 30 46 36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.55" fill="none"/>
              <path d="M50 6 C60 16 60 34 54 44" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.3" fill="none"/>
            </svg>
          </div>
          <h2 className="asnd__ready-heading">Guess the Animal Sound</h2>
          <p className="asnd__ready-desc">
            Listen to the sound, then choose the animal in English. Tap the
            answer card to reveal its Dharawal name.
          </p>
          <p className="asnd__muted">
            {available.length} animal {available.length === 1 ? 'sound' : 'sounds'} available
          </p>
          <button className="asnd__start" onClick={startGame}>Start</button>
        </div>
      </div>
    );
  }

  // ── End ───────────────────────────────────────────────────────────────────
  if (phase === 'end') {
    return (
      <div className="asnd">
        {header}
        <div className="asnd__center">
          <div className="asnd__end-score">{score}</div>
          <div className="asnd__end-label">correct out of {round.length}</div>
          <button className="asnd__start" onClick={startGame}>Play Again</button>
          <button className="asnd__menu-btn" onClick={onBack}>Back to Menu</button>
        </div>
      </div>
    );
  }

  // ── Playing ───────────────────────────────────────────────────────────────
  const isCorrect = picked && picked.english === current.english;

  return (
    <div className="asnd">
      {header}

      <div className="asnd__progress">
        Sound {idx + 1} of {round.length}
      </div>

      {!picked && (
        <>
          <div className="asnd__play-wrap">
            <button
              className={`asnd__play ${playing ? 'asnd__play--on' : ''}`}
              onClick={playSound}
              aria-label="Play the animal sound"
            >
              <span className="asnd__play-icon">
                <svg viewBox="0 0 40 40" fill="none">
                  <path d="M8 14 H14 L22 7 V33 L14 26 H8 Z" fill="white"/>
                  <path d="M27 14 C30 17 30 23 27 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <path d="M32 10 C37 15 37 25 32 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" fill="none"/>
                </svg>
              </span>
              <span className="asnd__play-label">
                {playing ? 'Playing…' : 'Play sound'}
              </span>
            </button>
            <div className="asnd__waves" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className={`asnd__wave ${playing ? 'asnd__wave--on' : ''}`}
                  style={{ '--i': i }}
                />
              ))}
            </div>
          </div>

          <div className="asnd__hint-wrap">
            {showHint ? (
              <p className="asnd__hint">{current.hint}</p>
            ) : (
              <button className="asnd__hint-btn" onClick={() => setShowHint(true)}>
                Need a hint?
              </button>
            )}
          </div>

          <p className="asnd__prompt">Which animal is it?</p>
          <div className="asnd__opts">
            {options.map(opt => (
              <button
                key={opt.slug}
                className="asnd__opt"
                onClick={() => answer(opt)}
              >
                {opt.english}
              </button>
            ))}
          </div>
        </>
      )}

      {picked && (
        <div className="asnd__reveal">
          <p className={`asnd__verdict ${isCorrect ? 'asnd__verdict--yes' : 'asnd__verdict--no'}`}>
            {isCorrect ? 'Correct!' : `Not quite — you chose ${picked.english}`}
          </p>

          <button
            className={`asnd__card ${flipped ? 'asnd__card--flipped' : ''}`}
            onClick={() => setFlipped(f => !f)}
            aria-label={flipped ? 'Show English name' : 'Show Dharawal name'}
          >
            <span className="asnd__card-inner">
              <span className="asnd__card-face asnd__card-face--front">
                <img
                  src={photoUrl(current.slug)}
                  alt={current.english}
                  className="asnd__card-img"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <span className="asnd__card-name">{current.english}</span>
                <span className="asnd__card-tap">Tap for the Dharawal name</span>
              </span>
              <span className="asnd__card-face asnd__card-face--back">
                <span className="asnd__card-dharawal">{current.dharawal}</span>
                <span className="asnd__card-eng">{current.english}</span>
                <span className="asnd__card-tap">Tap to flip back</span>
              </span>
            </span>
          </button>

          <div className="asnd__reveal-actions">
            <button className="asnd__replay" onClick={playSound}>
              Hear it again
            </button>
            <button className="asnd__next" onClick={next}>
              {idx + 1 >= round.length ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
