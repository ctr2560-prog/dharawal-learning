import { useState, useEffect, useRef, useMemo } from 'react';
import { vocabulary } from '../data/vocabulary.js';
import './SpeedRound.css';

const DURATION = 60;

function pickOptions(correct, pool) {
  const wrong = [...pool]
    .filter(w => w.english !== correct.english)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return [...wrong, correct].sort(() => Math.random() - 0.5);
}

function getHS() { return parseInt(localStorage.getItem('dw_speed_hs') || '0', 10); }
function saveHS(n) { if (n > getHS()) localStorage.setItem('dw_speed_hs', String(n)); }

export default function SpeedRound({ onBack }) {
  const [phase, setPhase] = useState('ready');
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [shuffled, setShuffled] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flash, setFlash] = useState(null); // 'correct' | 'wrong' | null
  const [hs, setHs] = useState(getHS);
  const timerRef = useRef(null);

  const currentWord = shuffled[idx % Math.max(shuffled.length, 1)];
  const options = useMemo(() => currentWord ? pickOptions(currentWord, vocabulary) : [], [currentWord]);

  function startGame() {
    const s = [...vocabulary].sort(() => Math.random() - 0.5);
    setShuffled(s);
    setIdx(0);
    setCorrect(0);
    setTotal(0);
    setTimeLeft(DURATION);
    setFlash(null);
    setPhase('playing');
  }

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase('end'); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase === 'end') { saveHS(correct); setHs(getHS()); }
  }, [phase, correct]);

  function answer(option) {
    if (flash) return;
    const ok = option.english === currentWord.english;
    setFlash(ok ? 'correct' : 'wrong');
    if (ok) setCorrect(c => c + 1);
    setTotal(t => t + 1);
    setTimeout(() => { setFlash(null); setIdx(i => i + 1); }, 380);
  }

  if (phase === 'ready') return (
    <div className="speed">
      <div className="speed__header">
        <button className="speed__back" onClick={onBack}>‹</button>
        <h2 className="speed__title">Speed Round</h2>
      </div>
      <div className="speed__center">
        <div className="speed__bolt">
          <svg viewBox="0 0 48 60" fill="none"><path d="M28 4 L8 34 H22 L20 56 L40 26 H26 Z" fill="white" stroke="white" strokeWidth="1"/></svg>
        </div>
        <h2 className="speed__ready-heading">Speed Round</h2>
        <p className="speed__ready-desc">Answer as many Dharawal word questions as you can in {DURATION} seconds!</p>
        {hs > 0 && <p className="speed__hs">Personal best: <strong>{hs}</strong></p>}
        <button className="speed__start" onClick={startGame}>Start</button>
      </div>
    </div>
  );

  if (phase === 'end') return (
    <div className="speed">
      <div className="speed__header">
        <button className="speed__back" onClick={onBack}>‹</button>
        <h2 className="speed__title">Speed Round</h2>
      </div>
      <div className="speed__center">
        {correct >= hs && correct > 0 && <div className="speed__new-hs">New personal best!</div>}
        <div className="speed__end-score">{correct}</div>
        <div className="speed__end-label">correct out of {total}</div>
        {hs > 0 && <p className="speed__hs">Best: <strong>{hs}</strong></p>}
        <button className="speed__start" onClick={startGame}>Play Again</button>
        <button className="speed__menu-btn" onClick={onBack}>Back to Menu</button>
      </div>
    </div>
  );

  const pct = (timeLeft / DURATION) * 100;
  const urgent = timeLeft <= 10;

  return (
    <div className={`speed speed--playing ${flash ? `speed--${flash}` : ''}`}>
      <div className="speed__header">
        <button className="speed__back" onClick={onBack}>‹</button>
        <h2 className="speed__title">Speed Round</h2>
        <div className="speed__live-score">{correct}</div>
      </div>

      <div className="speed__timer-track">
        <div className={`speed__timer-fill ${urgent ? 'speed__timer-fill--urgent' : ''}`} style={{ width: `${pct}%` }} />
      </div>
      <div className={`speed__timer-num ${urgent ? 'speed__timer-num--urgent' : ''}`}>{timeLeft}s</div>

      <div className="speed__q-wrap">
        <div className="speed__q-label">The Dharawal word for...</div>
        <div className="speed__q-word">{currentWord?.english}</div>
        <div className="speed__q-cat">{currentWord?.category}</div>
      </div>

      <div className="speed__opts">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`speed__opt ${flash && opt.english === currentWord.english ? 'speed__opt--correct' : ''}`}
            onClick={() => answer(opt)}
            disabled={!!flash}
          >
            {opt.dharawal}
          </button>
        ))}
      </div>
    </div>
  );
}
