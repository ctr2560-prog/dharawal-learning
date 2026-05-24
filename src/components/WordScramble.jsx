import { useState, useCallback } from 'react';
import { vocabulary } from '../data/vocabulary.js';
import './WordScramble.css';

// Only single-word Dharawal entries with 3+ letters
const POOL = vocabulary.filter(w => !w.dharawal.includes(' ') && w.dharawal.length >= 3);

function scrambleWord(str) {
  const chars = str.split('');
  if (chars.length <= 2) return chars;
  let result;
  let tries = 0;
  do {
    result = [...chars].sort(() => Math.random() - 0.5);
    tries++;
  } while (result.join('') === str && tries < 30);
  return result;
}

function pickWord(exclude) {
  const pool = exclude ? POOL.filter(w => w !== exclude) : POOL;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildTiles(word) {
  return scrambleWord(word.dharawal).map((char, i) => ({ char, id: i, placed: false }));
}

export default function WordScramble({ onBack }) {
  const [word, setWord] = useState(() => pickWord());
  const [tiles, setTiles] = useState(() => buildTiles(pickWord()));
  const [answer, setAnswer] = useState([]); // ordered list of tile ids
  const [status, setStatus] = useState('playing'); // playing | correct | wrong
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const startWord = useCallback((prev) => {
    const next = pickWord(prev);
    setWord(next);
    setTiles(buildTiles(next));
    setAnswer([]);
    setStatus('playing');
  }, []);

  // Start fresh with the initial word properly
  const [initialized, setInitialized] = useState(false);
  if (!initialized) {
    const first = pickWord();
    setWord(first);
    setTiles(buildTiles(first));
    setInitialized(true);
  }

  function placeTile(id) {
    if (status !== 'playing') return;
    const tile = tiles.find(t => t.id === id && !t.placed);
    if (!tile) return;

    const newAnswer = [...answer, id];
    const newTiles = tiles.map(t => t.id === id ? { ...t, placed: true } : t);
    setAnswer(newAnswer);
    setTiles(newTiles);

    // Auto-check when complete
    if (newAnswer.length === word.dharawal.length) {
      const attempt = newAnswer.map(tid => newTiles.find(t => t.id === tid).char).join('');
      if (attempt === word.dharawal) {
        setStatus('correct');
        setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }));
      } else {
        setStatus('wrong');
        setScore(s => ({ ...s, total: s.total + 1 }));
      }
    }
  }

  function liftTile(ansIdx) {
    if (status !== 'playing') return;
    const id = answer[ansIdx];
    setAnswer(answer.filter((_, i) => i !== ansIdx));
    setTiles(tiles.map(t => t.id === id ? { ...t, placed: false } : t));
  }

  function clearAll() {
    setAnswer([]);
    setTiles(tiles.map(t => ({ ...t, placed: false })));
    setStatus('playing');
  }

  function reshuffle() {
    // Re-scramble unplaced tiles
    const placed = tiles.filter(t => t.placed);
    const unplaced = scrambleWord(tiles.filter(t => !t.placed).map(t => t.char))
      .map((char, i) => {
        const orig = tiles.filter(t => !t.placed)[i];
        return { ...orig, char };
      });
    // Reset to fresh scramble of the whole word
    setAnswer([]);
    setTiles(buildTiles(word));
    setStatus('playing');
  }

  const answerChars = answer.map(id => tiles.find(t => t.id === id)?.char ?? '');
  const unplaced = tiles.filter(t => !t.placed);
  const wordLen = word.dharawal.length;

  return (
    <div className="scramble">
      <div className="scramble__header">
        <button className="scramble__back" onClick={onBack}>‹</button>
        <div>
          <h2 className="scramble__title">Word Scramble</h2>
          <p className="scramble__sub">Unscramble the Dharawal word</p>
        </div>
        <div className="scramble__score">{score.correct} / {score.total}</div>
      </div>

      <div className="scramble__body">
        {/* Clue */}
        <div className="scramble__clue">
          <div className="scramble__clue-label">The Dharawal word for...</div>
          <div className="scramble__clue-word">{word.english}</div>
          <div className="scramble__clue-cat">{word.category}</div>
        </div>

        {/* Answer slots */}
        <div className={`scramble__answer-row ${status !== 'playing' ? `scramble__answer-row--${status}` : ''}`}>
          {Array.from({ length: wordLen }).map((_, i) => (
            <button
              key={i}
              className={`scramble__slot ${answerChars[i] ? 'scramble__slot--filled' : ''}`}
              onClick={() => answerChars[i] && liftTile(i)}
              title={answerChars[i] ? 'Click to remove' : ''}
            >
              {answerChars[i] || ''}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {status === 'correct' && (
          <div className="scramble__feedback scramble__feedback--correct">
            Correct! The Dharawal word is <strong>{word.dharawal}</strong> ({word.english})
          </div>
        )}
        {status === 'wrong' && (
          <div className="scramble__feedback scramble__feedback--wrong">
            Not quite. The answer is <strong>{word.dharawal}</strong>
          </div>
        )}

        {/* Letter tiles */}
        <div className="scramble__tile-row">
          {unplaced.map(tile => (
            <button
              key={tile.id}
              className="scramble__tile"
              onClick={() => placeTile(tile.id)}
              disabled={status !== 'playing'}
            >
              {tile.char}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="scramble__controls">
          {status === 'playing' && (
            <>
              {answer.length > 0 && (
                <button className="scramble__ctrl scramble__ctrl--clear" onClick={clearAll}>Clear</button>
              )}
              <button className="scramble__ctrl scramble__ctrl--shuffle" onClick={reshuffle}>Reshuffle</button>
            </>
          )}
          {status !== 'playing' && (
            <button className="scramble__ctrl scramble__ctrl--next" onClick={() => startWord(word)}>
              Next word
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
