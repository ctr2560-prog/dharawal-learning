import { useState, useEffect } from 'react';
import { vocabulary } from '../data/vocabulary.js';
import './FillBlanks.css';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestion(item, allVocab, direction) {
  // direction: 'toDharawal' or 'toEnglish'
  const others = allVocab.filter(v => v !== item);
  const wrongPool = shuffle(others).slice(0, 3);
  if (direction === 'toDharawal') {
    const options = shuffle([item.dharawal, ...wrongPool.map(v => v.dharawal)]);
    return {
      prompt: `What is the Dharawal word for "${item.english}"?`,
      answer: item.dharawal,
      options,
      hint: `English: ${item.english}`,
    };
  } else {
    const options = shuffle([item.english, ...wrongPool.map(v => v.english)]);
    return {
      prompt: `What does "${item.dharawal}" mean in English?`,
      answer: item.english,
      options,
      hint: `Dharawal: ${item.dharawal}`,
    };
  }
}

function buildQuiz(count = 10) {
  const pool = shuffle(vocabulary).slice(0, count);
  return pool.map((item, i) =>
    buildQuestion(item, vocabulary, i % 2 === 0 ? 'toDharawal' : 'toEnglish')
  );
}


export default function FillBlanks({ onBack }) {
  const [quiz, setQuiz] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => { startQuiz(); }, []);

  function startQuiz() {
    setQuiz(buildQuiz(10));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setFeedback(null);
  }

  function handleAnswer(option) {
    if (selected !== null) return;
    const q = quiz[current];
    const correct = option === q.answer;
    setSelected(option);
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (current + 1 >= quiz.length) {
        setDone(true);
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
        setFeedback(null);
      }
    }, 1200);
  }

  if (!quiz.length) return null;

  const q = quiz[current];
  const progress = ((current) / quiz.length) * 100;
  const finalScore = Math.round((score / quiz.length) * 100);

  return (
    <div className="blanks">
      <div className="blanks__header">
        <button className="blanks__back" onClick={onBack}>‹</button>
        <div>
          <h2 className="blanks__title">Fill the Blanks</h2>
          <p className="blanks__sub">English to Dharawal</p>
        </div>
        <div className="blanks__score-badge">
          <span>{score}</span>
          <small>pts</small>
        </div>
      </div>

      {done ? (
        <div className="blanks__result">
          <h3 className="blanks__result-title">
            {finalScore >= 80 ? 'Outstanding!' : finalScore >= 60 ? 'Well done!' : 'Keep practising!'}
          </h3>
          <div className="blanks__result-score">{score} / {quiz.length}</div>
          <div className="blanks__result-bar">
            <div className="blanks__result-fill" style={{ width: `${finalScore}%` }} />
          </div>
          <p className="blanks__result-pct">{finalScore}%</p>
          <p className="blanks__result-msg">
            {finalScore >= 80
              ? 'You\'re a Dharawal language champion! Ngayagang dharawal!'
              : finalScore >= 60
              ? 'Great effort! You\'re learning the Dharawal language well.'
              : 'Every bit of practice helps preserve the Dharawal language. Try again!'}
          </p>
          <button className="blanks__replay" onClick={startQuiz}>Try Again</button>
        </div>
      ) : (
        <>
          <div className="blanks__progress-wrap">
            <div className="blanks__progress">
              <div className="blanks__progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="blanks__progress-txt">{current + 1} / {quiz.length}</span>
          </div>

          <div className="blanks__card">
            <div className="blanks__card-inner">
              <p className="blanks__prompt">{q.prompt}</p>

              {feedback && (
                <div className={`blanks__feedback blanks__feedback--${feedback}`}>
                  {feedback === 'correct'
                    ? `✓ Correct! "${q.answer}"`
                    : `✗ The answer was "${q.answer}"`}
                </div>
              )}

              <div className="blanks__options">
                {q.options.map(opt => {
                  let cls = 'blanks__option';
                  if (selected !== null) {
                    if (opt === q.answer) cls += ' blanks__option--correct';
                    else if (opt === selected) cls += ' blanks__option--wrong';
                    else cls += ' blanks__option--dim';
                  }
                  return (
                    <button
                      key={opt}
                      className={cls}
                      onClick={() => handleAnswer(opt)}
                      disabled={selected !== null}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="blanks__dots">
            {quiz.map((_, i) => (
              <span
                key={i}
                className={`blanks__dot ${i < current ? 'blanks__dot--done' : i === current ? 'blanks__dot--current' : ''}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
