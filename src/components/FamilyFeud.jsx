import { useState, useRef } from 'react';
import './FamilyFeud.css';

const QUESTIONS = [
  {
    q: 'Name a Dharawal word for an animal that lives in or near water',
    answers: [
      { text: 'yanaga (shark)',     keys: ['yanaga','shark'],     pts: 35 },
      { text: 'dhanj (fish)',        keys: ['dhanj','fish'],       pts: 28 },
      { text: 'gariga (crab)',       keys: ['gariga','crab'],      pts: 18 },
      { text: 'girawaa (stingray)', keys: ['girawaa','stingray'], pts: 12 },
      { text: 'bara (eel)',          keys: ['bara','eel'],          pts: 7  },
    ],
  },
  {
    q: 'Name a Dharawal word for a part of your face',
    answers: [
      { text: 'mii (eye)',     keys: ['mii','eye'],   pts: 38 },
      { text: 'nugar (nose)',  keys: ['nugar','nose'], pts: 28 },
      { text: 'gami (mouth)', keys: ['gami','mouth'], pts: 20 },
      { text: 'guri (ear)',   keys: ['guri','ear'],   pts: 9  },
      { text: 'yira (teeth)', keys: ['yira','teeth'], pts: 5  },
    ],
  },
  {
    q: 'Name a Dharawal word for an animal with four legs',
    answers: [
      { text: 'buru (kangaroo)',     keys: ['buru','kangaroo'],   pts: 40 },
      { text: 'kooala (koala)',      keys: ['kooala','koala'],    pts: 28 },
      { text: 'warrigal (dingo)',    keys: ['warrigal','dingo'],  pts: 18 },
      { text: 'guruwara (possum)',   keys: ['guruwara','possum'], pts: 10 },
      { text: 'magadaang (lizard)', keys: ['magadaang','lizard'], pts: 4  },
    ],
  },
  {
    q: 'Name a Dharawal word for something you can see in the sky',
    answers: [
      { text: 'wuri (sun)',     keys: ['wuri','sun'],     pts: 42 },
      { text: 'djadju (moon)',  keys: ['djadju','moon'],  pts: 34 },
      { text: 'bana (rain)',    keys: ['bana','rain'],    pts: 15 },
      { text: 'budjaan (bird)', keys: ['budjaan','bird'], pts: 9  },
    ],
  },
  {
    q: 'Name a Dharawal number word',
    answers: [
      { text: 'midhang (one)',           keys: ['midhang','one','1'],              pts: 38 },
      { text: 'bularr (two)',            keys: ['bularr','two','2'],               pts: 30 },
      { text: 'bularra midhang (three)', keys: ['bularra midhang','three','3'],    pts: 18 },
      { text: 'bularra bullarra (four)', keys: ['bularra bullarra','four','4'],    pts: 9  },
      { text: 'bula bula midha (five)',  keys: ['bula bula midha','five','5'],     pts: 5  },
    ],
  },
  {
    q: 'Name a Dharawal word for something you find on Country (land/bush)',
    answers: [
      { text: 'gundhu (tree)',   keys: ['gundhu','tree'],                      pts: 40 },
      { text: 'bamburr (grass)', keys: ['bamburr','grass'],                    pts: 28 },
      { text: 'gurabang (rock)', keys: ['gurabang','rock'],                    pts: 20 },
      { text: 'nura (country)',  keys: ['nura','country','land','home','place'], pts: 8  },
      { text: 'yarra (cave)',    keys: ['yarra','cave'],                        pts: 4  },
    ],
  },
  {
    q: 'Name something you can DO in Dharawal (an action word)',
    answers: [
      { text: 'dhanma (eat)',   keys: ['dhanma','eat'],   pts: 45 },
      { text: 'njunda (drink)', keys: ['njunda','drink'],  pts: 30 },
      { text: 'mandha (catch)', keys: ['mandha','catch'],  pts: 15 },
      { text: 'dhungga (cry)',  keys: ['dhungga','cry'],   pts: 10 },
    ],
  },
  {
    q: 'Name a Dharawal word for a family member or person',
    answers: [
      { text: 'Mabarraa (uncle)',        keys: ['mabarraa','uncle'],         pts: 40 },
      { text: 'dhullai (man)',           keys: ['dhullai','man'],            pts: 28 },
      { text: 'banda (boy)',             keys: ['banda','boy'],              pts: 22 },
      { text: 'dhullai murra (husband)', keys: ['dhullai murra','husband'],  pts: 10 },
    ],
  },
];

const MAX_STRIKES = 3;

function matchAnswer(guess, answers, revealed) {
  const g = guess.trim().toLowerCase();
  return answers.findIndex((a, i) => !revealed.has(i) && a.keys.some(k => k.toLowerCase() === g));
}

export default function FamilyFeud({ onBack }) {
  const [qIdx, setQIdx] = useState(0);
  const [revealed, setRevealed] = useState(new Set());
  const [strikes, setStrikes] = useState(0);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [team, setTeam] = useState(1);
  const [phase, setPhase] = useState('main'); // main | steal | roundEnd | gameEnd
  const [guess, setGuess] = useState('');
  const [flash, setFlash] = useState(null); // null | 'hit' | 'miss' | 'steal-win' | 'steal-lose'
  const [roundPts, setRoundPts] = useState(0);
  const inputRef = useRef();

  const q = QUESTIONS[qIdx];
  const totalPts = q.answers.reduce((s, a) => s + a.pts, 0);
  const revealedPts = [...revealed].reduce((s, i) => s + q.answers[i].pts, 0);
  const unrevealedPts = totalPts - revealedPts;
  const allRevealed = revealed.size === q.answers.length;

  function submitGuess(e) {
    e?.preventDefault();
    if (!guess.trim() || flash) return;

    const matchIdx = matchAnswer(guess, q.answers, revealed);

    if (matchIdx >= 0) {
      const pts = q.answers[matchIdx].pts;
      setRevealed(r => new Set([...r, matchIdx]));
      setRoundPts(p => p + pts);
      setFlash('hit');
      setGuess('');
      setTimeout(() => {
        setFlash(null);
        if (revealed.size + 1 === q.answers.length) {
          // All revealed
          awardTeam(team, roundPts + pts);
        }
        inputRef.current?.focus();
      }, 900);
    } else {
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      setFlash('miss');
      setGuess('');
      setTimeout(() => {
        setFlash(null);
        if (newStrikes >= MAX_STRIKES) {
          setPhase('steal');
        }
        inputRef.current?.focus();
      }, 900);
    }
  }

  function submitSteal(e) {
    e?.preventDefault();
    if (!guess.trim() || flash) return;

    const stealTeam = team === 1 ? 2 : 1;
    const matchIdx = matchAnswer(guess, q.answers, revealed);

    if (matchIdx >= 0) {
      // Successful steal
      setRevealed(r => new Set([...r, matchIdx]));
      setFlash('steal-win');
      setTimeout(() => {
        revealAll();
        awardTeam(stealTeam, unrevealedPts);
      }, 1200);
    } else {
      // Failed steal
      setFlash('steal-lose');
      setTimeout(() => {
        revealAll();
        awardTeam(team, unrevealedPts);
      }, 1200);
    }
    setGuess('');
  }

  function revealAll() {
    setRevealed(new Set(q.answers.map((_, i) => i)));
    setPhase('roundEnd');
  }

  function awardTeam(t, pts) {
    setScores(s => ({ ...s, [t]: s[t] + (roundPts + pts) }));
    setRevealed(new Set(q.answers.map((_, i) => i)));
    setPhase('roundEnd');
  }

  function nextQuestion() {
    const next = qIdx + 1;
    if (next >= QUESTIONS.length) {
      setPhase('gameEnd');
    } else {
      setQIdx(next);
      setRevealed(new Set());
      setStrikes(0);
      setRoundPts(0);
      setGuess('');
      setFlash(null);
      setPhase('main');
      setTeam(team === 1 ? 2 : 1); // swap team each round
    }
  }

  function newGame() {
    setQIdx(0);
    setRevealed(new Set());
    setStrikes(0);
    setScores({ 1: 0, 2: 0 });
    setTeam(1);
    setPhase('main');
    setRoundPts(0);
    setGuess('');
    setFlash(null);
  }

  const otherTeam = team === 1 ? 2 : 1;

  return (
    <div className="feud">
      <div className="feud__header">
        <button className="feud__back" onClick={onBack}>‹</button>
        <h2 className="feud__title">Family Feud</h2>
        <div className="feud__scores">
          <div className={`feud__score ${team === 1 ? 'feud__score--active' : ''}`}>
            <span className="feud__score-label">Team 1</span>
            <span className="feud__score-val">{scores[1]}</span>
          </div>
          <div className="feud__score-divider">vs</div>
          <div className={`feud__score ${team === 2 ? 'feud__score--active' : ''}`}>
            <span className="feud__score-val">{scores[2]}</span>
            <span className="feud__score-label">Team 2</span>
          </div>
        </div>
        <div className="feud__team-toggle">
          <span className="feud__toggle-label">Answering:</span>
          <button className={`feud__toggle-btn ${team === 1 ? 'feud__toggle-btn--active' : ''}`} onClick={() => setTeam(1)}>T1</button>
          <button className={`feud__toggle-btn ${team === 2 ? 'feud__toggle-btn--active' : ''}`} onClick={() => setTeam(2)}>T2</button>
        </div>
      </div>

      <div className="feud__body">
        {/* Question */}
        <div className="feud__question">
          <div className="feud__q-num">Question {qIdx + 1} of {QUESTIONS.length}</div>
          <div className="feud__q-text">{q.q}</div>
        </div>

        {/* Strikes */}
        <div className="feud__strikes">
          {Array.from({ length: MAX_STRIKES }).map((_, i) => (
            <div key={i} className={`feud__strike ${i < strikes ? 'feud__strike--lit' : ''}`}>X</div>
          ))}
          {phase === 'steal' && (
            <div className="feud__steal-badge">STEAL! Team {otherTeam}</div>
          )}
        </div>

        {/* Answer board */}
        <div className="feud__board">
          {q.answers.map((a, i) => (
            <div key={i} className={`feud__tile ${revealed.has(i) ? 'feud__tile--revealed' : ''}`}>
              {revealed.has(i) ? (
                <div className="feud__tile-inner">
                  <span className="feud__tile-pts">{a.pts}</span>
                  <span className="feud__tile-text">{a.text}</span>
                </div>
              ) : (
                <div className="feud__tile-hidden">{i + 1}</div>
              )}
            </div>
          ))}
        </div>

        {/* Flash feedback */}
        {flash === 'hit' && <div className="feud__flash feud__flash--hit">Survey Says!</div>}
        {flash === 'miss' && <div className="feud__flash feud__flash--miss">Strike!</div>}
        {flash === 'steal-win' && <div className="feud__flash feud__flash--hit">Steal!</div>}
        {flash === 'steal-lose' && <div className="feud__flash feud__flash--miss">No Steal!</div>}

        {/* Input area */}
        {phase === 'main' && !allRevealed && (
          <form className="feud__form" onSubmit={submitGuess}>
            <div className="feud__form-label">
              Team {team} — type a guess (Dharawal OR English):
            </div>
            <div className="feud__input-row">
              <input
                ref={inputRef}
                className="feud__input"
                value={guess}
                onChange={e => setGuess(e.target.value)}
                placeholder="e.g. yanaga or shark"
                autoFocus
                disabled={!!flash}
              />
              <button className="feud__guess-btn" type="submit" disabled={!!flash || !guess.trim()}>
                Guess
              </button>
            </div>
          </form>
        )}

        {phase === 'steal' && (
          <form className="feud__form" onSubmit={submitSteal}>
            <div className="feud__form-label feud__form-label--steal">
              Team {otherTeam} — one steal attempt!
            </div>
            <div className="feud__input-row">
              <input
                ref={inputRef}
                className="feud__input"
                value={guess}
                onChange={e => setGuess(e.target.value)}
                placeholder="Name one answer..."
                autoFocus
                disabled={!!flash}
              />
              <button className="feud__guess-btn feud__guess-btn--steal" type="submit" disabled={!!flash || !guess.trim()}>
                Steal!
              </button>
            </div>
          </form>
        )}

        {(phase === 'roundEnd' || allRevealed) && phase !== 'gameEnd' && (
          <div className="feud__round-end">
            <button className="feud__next-btn" onClick={nextQuestion}>
              {qIdx + 1 < QUESTIONS.length ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}

        {phase === 'gameEnd' && (
          <div className="feud__game-end">
            <h3>Game Over!</h3>
            <p>Team 1: <strong>{scores[1]}</strong></p>
            <p>Team 2: <strong>{scores[2]}</strong></p>
            <p className="feud__winner">
              {scores[1] > scores[2] ? 'Team 1 wins!' : scores[2] > scores[1] ? 'Team 2 wins!' : "It's a tie!"}
            </p>
            <button className="feud__next-btn" onClick={newGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
