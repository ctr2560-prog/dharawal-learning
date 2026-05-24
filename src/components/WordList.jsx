import { useState } from 'react';
import { vocabulary } from '../data/vocabulary.js';
import './WordList.css';

const CATEGORIES = ['all', 'animals', 'body', 'nature', 'numbers', 'people', 'actions', 'objects', 'greetings', 'phrases'];
const CATEGORY_LABELS = {
  all: 'All', animals: 'Animals', body: 'Body', nature: 'Nature',
  numbers: 'Numbers', people: 'People', actions: 'Actions',
  objects: 'Objects', greetings: 'Greetings', phrases: 'Phrases',
};

export default function WordList({ onBack }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [flip, setFlip] = useState({});

  const filtered = vocabulary.filter(w => {
    const matchCat = filter === 'all' || w.category === filter;
    const s = search.toLowerCase();
    const matchSearch = !s || w.english.includes(s) || w.dharawal.toLowerCase().includes(s);
    return matchCat && matchSearch;
  });

  function toggleFlip(english) {
    setFlip(prev => ({ ...prev, [english]: !prev[english] }));
  }

  return (
    <div className="wordlist">
      <div className="wordlist__header">
        <button className="wordlist__back" onClick={onBack}>‹</button>
        <div>
          <h2 className="wordlist__title">Word List</h2>
          <p className="wordlist__sub">{filtered.length} of {vocabulary.length} words</p>
        </div>
      </div>

      <div className="wordlist__search-wrap">
        <input
          type="search"
          className="wordlist__search"
          placeholder="Search in English or Dharawal..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="wordlist__cats">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`wordlist__cat ${filter === cat ? 'wordlist__cat--active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="wordlist__hint">Tap a word to flip it</div>

      <div className="wordlist__grid">
        {filtered.map(word => (
          <button
            key={word.english + word.dharawal}
            className={`wordlist__word ${flip[word.english] ? 'wordlist__word--flipped' : ''}`}
            onClick={() => toggleFlip(word.english)}
          >
            <span className="wordlist__word-front">
              <span className="wordlist__en">{word.english}</span>
              <span className="wordlist__cat-badge">{word.category}</span>
            </span>
            <span className="wordlist__word-back">
              <span className="wordlist__dh">{word.dharawal}</span>
              <span className="wordlist__en-small">{word.english}</span>
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="wordlist__empty">
          <p>No words found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
