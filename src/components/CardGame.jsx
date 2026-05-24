import { useState, useEffect, useCallback } from 'react';
import { vocabulary } from '../data/vocabulary.js';
import './CardGame.css';

const EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'];

function VocabImage({ english }) {
  const slug = english.toLowerCase().replace(/\s+/g, '-');
  const [extIdx, setExtIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="cardgame__img-placeholder">{english}</span>;
  }

  return (
    <img
      key={extIdx}
      src={`/images/vocab/${slug}.${EXTENSIONS[extIdx]}`}
      alt={english}
      className="cardgame__vocab-img"
      onError={() => {
        if (extIdx + 1 < EXTENSIONS.length) setExtIdx(i => i + 1);
        else setFailed(true);
      }}
    />
  );
}

const VISUALIZABLE = vocabulary;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildGame(count) {
  const pool = shuffle(VISUALIZABLE).slice(0, count);
  return { imageCards: shuffle([...pool]), wordCards: shuffle([...pool]) };
}

export default function CardGame({ onBack }) {
  const [pairCount, setPairCount] = useState(6);
  const [imageCards, setImageCards] = useState([]);
  const [wordCards, setWordCards] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  const initGame = useCallback((count = pairCount) => {
    const { imageCards: imgs, wordCards: words } = buildGame(count);
    setImageCards(imgs);
    setWordCards(words);
    setSelectedId(null);
    setMatched(new Set());
    setAttempts(0);
    setShake(null);
    setGameWon(false);
  }, [pairCount]);

  useEffect(() => { initGame(); }, []);

  function handleImageClick(item) {
    if (matched.has(item.english)) return;
    setSelectedId(prev => prev === item.english ? null : item.english);
    setShake(null);
  }

  function handleWordClick(item) {
    if (matched.has(item.english)) return;
    if (!selectedId) return;

    setAttempts(a => a + 1);

    if (selectedId === item.english) {
      const newMatched = new Set([...matched, item.english]);
      setMatched(newMatched);
      setSelectedId(null);
      if (newMatched.size === pairCount) {
        setTimeout(() => setGameWon(true), 400);
      }
    } else {
      setShake(item.english);
      setTimeout(() => {
        setShake(null);
        setSelectedId(null);
      }, 800);
    }
  }

  const score = Math.max(0, Math.round(100 - (attempts - pairCount) * 8));

  return (
    <div className="cardgame">
      <div className="cardgame__header">
        <button className="cardgame__back" onClick={onBack}>‹</button>
        <div>
          <h2 className="cardgame__title">Word Matching</h2>
          <p className="cardgame__sub">Match the image to the Dharawal word</p>
        </div>
        <div className="cardgame__stats">
          <span className="cardgame__stat">
            <span className="cardgame__stat-val">{matched.size}/{pairCount}</span>
            <span className="cardgame__stat-lbl">Matched</span>
          </span>
          <span className="cardgame__stat">
            <span className="cardgame__stat-val">{attempts}</span>
            <span className="cardgame__stat-lbl">Tries</span>
          </span>
        </div>
      </div>

      <div className="cardgame__difficulty">
        {[6, 8, 10].map(n => (
          <button
            key={n}
            className={`cardgame__diff-btn ${pairCount === n ? 'cardgame__diff-btn--active' : ''}`}
            onClick={() => { setPairCount(n); initGame(n); }}
          >
            {n === 6 ? 'Easy' : n === 8 ? 'Medium' : 'Hard'}
            <span>{n} pairs</span>
          </button>
        ))}
      </div>

      {gameWon ? (
        <div className="cardgame__win">
          <h3 className="cardgame__win-title">Excellent!</h3>
          <p className="cardgame__win-msg">You matched all {pairCount} pairs in {attempts} tries!</p>
          <div className="cardgame__win-score">Score: {score}/100</div>
          <button className="cardgame__replay" onClick={() => initGame()}>Play Again</button>
        </div>
      ) : (
        <div className="cardgame__panels">
          {/* Image cards */}
          <div className="cardgame__panel">
            <p className="cardgame__panel-label">
              Click an image to select it
            </p>
            <div className="cardgame__img-grid">
              {imageCards.map(item => (
                <button
                  key={item.english}
                  className={[
                    'cardgame__img-card',
                    matched.has(item.english) ? 'cardgame__img-card--matched' : '',
                    selectedId === item.english ? 'cardgame__img-card--selected' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleImageClick(item)}
                  disabled={matched.has(item.english)}
                >
                  <VocabImage english={item.english} />
                  <span className="cardgame__en-label">{item.english}</span>
                  {matched.has(item.english) && (
                    <span className="cardgame__matched-tick">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="cardgame__divider" />

          {/* Dharawal word cards */}
          <div className="cardgame__panel">
            <p className="cardgame__panel-label">
              Then click the Dharawal word
            </p>
            <div className="cardgame__word-grid">
              {wordCards.map(item => (
                <button
                  key={item.english}
                  className={[
                    'cardgame__word-card',
                    matched.has(item.english) ? 'cardgame__word-card--matched' : '',
                    shake === item.english ? 'cardgame__word-card--shake' : '',
                    selectedId && !matched.has(item.english) ? 'cardgame__word-card--ready' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleWordClick(item)}
                  disabled={matched.has(item.english)}
                >
                  <span className="cardgame__dh-word">{item.dharawal}</span>
                  {matched.has(item.english) && (
                    <span className="cardgame__word-matched-label">{item.english}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="cardgame__footer">
        <button className="cardgame__new" onClick={() => initGame()}>New Game</button>
        {selectedId && !gameWon && (
          <p className="cardgame__hint">
            Selected: <strong>{selectedId}</strong>. Now click the matching Dharawal word.
          </p>
        )}
      </div>
    </div>
  );
}
