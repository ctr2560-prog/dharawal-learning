import { useState, useMemo } from 'react';
import { vocabulary } from '../data/vocabulary.js';
import './Jeopardy.css';

const CATEGORIES = [
  { id: 'animals',  label: 'Animals',           cats: ['animals'] },
  { id: 'body',     label: 'Body Parts',         cats: ['body'] },
  { id: 'country',  label: 'Country & Nature',   cats: ['country','sky','weather'] },
  { id: 'numbers',  label: 'Numbers & Objects',  cats: ['numbers','objects','food'] },
  { id: 'people',   label: 'People & Actions',   cats: ['greetings','phrases','family','people','actions'] },
];

const POINTS = [100, 200, 300, 400, 500];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildBoard() {
  return CATEGORIES.map(cat => {
    const pool = shuffle(vocabulary.filter(w => cat.cats.includes(w.category)));
    // Assign words to point levels (sorted: shorter dharawal = easier = lower pts)
    const sorted = [...pool].sort((a, b) => a.dharawal.length - b.dharawal.length);
    const step = Math.max(1, Math.floor(sorted.length / POINTS.length));

    const clues = POINTS.map((pts, i) => {
      const word = sorted[Math.min(i * step, sorted.length - 1)];
      const distractors = shuffle(vocabulary.filter(w => w.english !== word.english)).slice(0, 3);
      const options = shuffle([word, ...distractors]);
      return { word, pts, options, used: false };
    });

    return { ...cat, clues };
  });
}

export default function Jeopardy({ onBack }) {
  const [board, setBoard] = useState(() => buildBoard());
  const [active, setActive] = useState(null); // { catIdx, clueIdx }
  const [chosen, setChosen] = useState(null); // chosen option
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [team, setTeam] = useState(1);

  const activeClue = active ? board[active.catIdx].clues[active.clueIdx] : null;
  const isCorrect = chosen && activeClue && chosen.english === activeClue.word.english;

  function openClue(catIdx, clueIdx) {
    if (board[catIdx].clues[clueIdx].used) return;
    setActive({ catIdx, clueIdx });
    setChosen(null);
  }

  function choose(option) {
    if (chosen) return;
    setChosen(option);
  }

  function closeClue() {
    if (!active) return;
    const { catIdx, clueIdx } = active;
    const pts = board[catIdx].clues[clueIdx].pts;

    if (isCorrect) {
      setScores(s => ({ ...s, [team]: s[team] + pts }));
    }

    setBoard(b => b.map((cat, ci) =>
      ci !== catIdx ? cat : {
        ...cat,
        clues: cat.clues.map((cl, li) =>
          li !== clueIdx ? cl : { ...cl, used: true, wasCorrect: isCorrect }
        ),
      }
    ));

    setActive(null);
    setChosen(null);
  }

  const allUsed = board.every(cat => cat.clues.every(cl => cl.used));

  function newGame() {
    setBoard(buildBoard());
    setScores({ 1: 0, 2: 0 });
    setActive(null);
    setChosen(null);
    setTeam(1);
  }

  return (
    <div className="jep">
      {/* Header */}
      <div className="jep__header">
        <button className="jep__back" onClick={onBack}>‹</button>
        <h2 className="jep__title">Jeopardy</h2>
        <div className="jep__team-switcher">
          <button
            className={`jep__team-btn ${team === 1 ? 'jep__team-btn--active' : ''}`}
            onClick={() => setTeam(1)}
          >
            Team 1: {scores[1]}
          </button>
          <button
            className={`jep__team-btn ${team === 2 ? 'jep__team-btn--active' : ''}`}
            onClick={() => setTeam(2)}
          >
            Team 2: {scores[2]}
          </button>
        </div>
        <button className="jep__new-btn" onClick={newGame}>New Game</button>
      </div>

      {/* Board */}
      <div className="jep__board">
        {board.map((cat, ci) => (
          <div key={cat.id} className="jep__col">
            <div className="jep__cat-header">{cat.label}</div>
            {cat.clues.map((clue, li) => (
              <button
                key={li}
                className={`jep__cell ${clue.used ? `jep__cell--used jep__cell--${clue.wasCorrect ? 'correct' : 'wrong'}` : ''}`}
                onClick={() => openClue(ci, li)}
                disabled={clue.used}
              >
                {clue.used ? '' : `$${clue.pts}`}
              </button>
            ))}
          </div>
        ))}
      </div>

      {allUsed && (
        <div className="jep__gameover">
          <div className="jep__gameover-inner">
            <h3>Game Over!</h3>
            <p>Team 1: <strong>{scores[1]}</strong></p>
            <p>Team 2: <strong>{scores[2]}</strong></p>
            <p className="jep__winner">
              {scores[1] > scores[2] ? 'Team 1 wins!' : scores[2] > scores[1] ? 'Team 2 wins!' : 'It\'s a tie!'}
            </p>
            <button className="jep__new-btn" onClick={newGame}>Play Again</button>
          </div>
        </div>
      )}

      {/* Clue modal */}
      {active && activeClue && (
        <div className="jep__modal-bg" onClick={chosen ? closeClue : undefined}>
          <div className="jep__modal" onClick={e => e.stopPropagation()}>
            <div className="jep__modal-pts">${activeClue.pts}</div>
            <div className="jep__modal-cat">{board[active.catIdx].label}</div>
            <div className="jep__modal-q">
              What is the Dharawal word for...
            </div>
            <div className="jep__modal-word">{activeClue.word.english}</div>

            {!chosen ? (
              <div className="jep__options">
                {activeClue.options.map((opt, i) => (
                  <button key={i} className="jep__option" onClick={() => choose(opt)}>
                    {opt.dharawal}
                  </button>
                ))}
              </div>
            ) : (
              <div className={`jep__result ${isCorrect ? 'jep__result--correct' : 'jep__result--wrong'}`}>
                <div className="jep__result-verdict">
                  {isCorrect ? `Correct! +${activeClue.pts} for Team ${team}` : 'Not quite!'}
                </div>
                <div className="jep__result-answer">
                  {activeClue.word.english} = <strong>{activeClue.word.dharawal}</strong>
                </div>
                <button className="jep__close-btn" onClick={closeClue}>Back to Board</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
