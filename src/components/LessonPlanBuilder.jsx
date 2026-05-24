import { useState } from 'react';
import { vocabulary } from '../data/vocabulary.js';
import './LessonPlanBuilder.css';

const KLAS = [
  { id: 'english',  label: 'English / Literacy',     categories: ['greetings','phrases','actions','animals','body','country','sky','weather','numbers','objects','food','family','people'] },
  { id: 'maths',    label: 'Mathematics',             categories: ['numbers'] },
  { id: 'science',  label: 'Science & Technology',    categories: ['animals','country','sky','weather'] },
  { id: 'hsie',     label: 'HSIE / History',          categories: ['country','people','family'] },
  { id: 'pdhpe',    label: 'PDHPE',                   categories: ['body','actions'] },
];

const YEAR_GROUPS = ['Kindergarten', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'];
const DURATIONS = ['30 minutes', '45 minutes', '60 minutes', '75 minutes', '90 minutes'];

const OUTCOMES = {
  english:  'EN2-1A: communicates in a range of contexts, using familiar and new language\nEN2-8B: identifies and uses language forms and features',
  maths:    'MA2-1WM: uses appropriate terminology to describe and link mathematical ideas\nMA2-4NA: applies place value to order, read and represent numbers',
  science:  'ST2-11LW: describes a variety of living things and their environments\nST2-4WS: investigates their questions about the world',
  hsie:     'HT2-1: identifies changes and continuities in family and community life\nGE2-1: examines features and characteristics of places and environments',
  pdhpe:    'PD2-1: examines how decisions are made and their implications\nPD2-4: describes strategies to make safe and healthy choices',
};

export default function LessonPlanBuilder({ onBack }) {
  const [kla, setKla] = useState('english');
  const [form, setForm] = useState({
    teacher: '', school: 'Sarah Redfern High School', date: '',
    yearGroup: '', duration: '60 minutes', topic: '', learningIntention: '',
    outcomes: '', intro: '', body: '', conclusion: '', assessment: '', resources: '',
  });
  const [selectedVocab, setSelectedVocab] = useState(new Set());

  const klaObj = KLAS.find(k => k.id === kla);
  const pool = vocabulary.filter(w => klaObj.categories.includes(w.category));
  const selectedWords = vocabulary.filter(w => selectedVocab.has(w.english));

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleKlaChange(id) {
    setKla(id);
    setSelectedVocab(new Set());
    setForm(f => ({ ...f, outcomes: OUTCOMES[id] || '' }));
  }

  function toggleVocab(english) {
    setSelectedVocab(prev => {
      const next = new Set(prev);
      next.has(english) ? next.delete(english) : next.add(english);
      return next;
    });
  }

  const today = new Date().toLocaleDateString('en-AU');

  return (
    <div className="lpb">
      <div className="lpb__header">
        <button className="lpb__back" onClick={onBack}>‹</button>
        <div>
          <h2 className="lpb__title">Lesson Plan Builder</h2>
          <p className="lpb__sub">NSW format with Dharawal language integration</p>
        </div>
        <button
          className="lpb__print-btn"
          onClick={() => window.print()}
          disabled={!form.topic}
        >
          Print Lesson Plan
        </button>
      </div>

      <div className="lpb__layout">
        {/* Left: form */}
        <div className="lpb__form">

          <section className="lpb__section">
            <h3 className="lpb__section-title">Key Learning Area</h3>
            <div className="lpb__kla-list">
              {KLAS.map(k => (
                <button
                  key={k.id}
                  className={`lpb__kla-btn ${kla === k.id ? 'lpb__kla-btn--active' : ''}`}
                  onClick={() => handleKlaChange(k.id)}
                >
                  {k.label}
                </button>
              ))}
            </div>
          </section>

          <section className="lpb__section">
            <h3 className="lpb__section-title">Lesson Details</h3>
            <div className="lpb__fields">
              <label className="lpb__field lpb__field--full">
                <span>Topic / Unit</span>
                <input value={form.topic} onChange={e => set('topic', e.target.value)} placeholder="e.g. Animals of Dharawal Country" />
              </label>
              <label className="lpb__field">
                <span>Teacher</span>
                <input value={form.teacher} onChange={e => set('teacher', e.target.value)} placeholder="Ms Smith" />
              </label>
              <label className="lpb__field">
                <span>School</span>
                <input value={form.school} onChange={e => set('school', e.target.value)} />
              </label>
              <label className="lpb__field">
                <span>Year Group</span>
                <select value={form.yearGroup} onChange={e => set('yearGroup', e.target.value)}>
                  <option value="">Select</option>
                  {YEAR_GROUPS.map(y => <option key={y}>{y}</option>)}
                </select>
              </label>
              <label className="lpb__field">
                <span>Duration</span>
                <select value={form.duration} onChange={e => set('duration', e.target.value)}>
                  {DURATIONS.map(d => <option key={d}>{d}</option>)}
                </select>
              </label>
              <label className="lpb__field">
                <span>Date</span>
                <input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
              </label>
              <label className="lpb__field lpb__field--full">
                <span>Learning Intention</span>
                <input value={form.learningIntention} onChange={e => set('learningIntention', e.target.value)} placeholder="Students will be able to..." />
              </label>
              <label className="lpb__field lpb__field--full">
                <span>Syllabus Outcomes</span>
                <textarea rows={3} value={form.outcomes} onChange={e => set('outcomes', e.target.value)} />
              </label>
            </div>
          </section>

          <section className="lpb__section">
            <h3 className="lpb__section-title">Dharawal Vocabulary ({selectedVocab.size} selected)</h3>
            <div className="lpb__vocab-list">
              {pool.map(w => (
                <label key={w.english} className="lpb__vocab-item">
                  <input
                    type="checkbox"
                    checked={selectedVocab.has(w.english)}
                    onChange={() => toggleVocab(w.english)}
                  />
                  <span className="lpb__vocab-en">{w.english}</span>
                  <span className="lpb__vocab-dh">{w.dharawal}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="lpb__section">
            <h3 className="lpb__section-title">Lesson Stages</h3>
            <div className="lpb__fields">
              <label className="lpb__field lpb__field--full">
                <span>Introduction / Hook</span>
                <textarea rows={3} value={form.intro} onChange={e => set('intro', e.target.value)} placeholder="How will you open the lesson and connect to Dharawal language?" />
              </label>
              <label className="lpb__field lpb__field--full">
                <span>Teaching and Learning Activities</span>
                <textarea rows={5} value={form.body} onChange={e => set('body', e.target.value)} placeholder="Describe the main activities. How will Dharawal vocabulary be embedded?" />
              </label>
              <label className="lpb__field lpb__field--full">
                <span>Conclusion</span>
                <textarea rows={2} value={form.conclusion} onChange={e => set('conclusion', e.target.value)} placeholder="How will students reflect on and consolidate their Dharawal learning?" />
              </label>
            </div>
          </section>

          <section className="lpb__section">
            <h3 className="lpb__section-title">Assessment and Resources</h3>
            <div className="lpb__fields">
              <label className="lpb__field lpb__field--full">
                <span>Assessment</span>
                <textarea rows={2} value={form.assessment} onChange={e => set('assessment', e.target.value)} placeholder="How will you assess student understanding of the Dharawal language content?" />
              </label>
              <label className="lpb__field lpb__field--full">
                <span>Resources</span>
                <textarea rows={2} value={form.resources} onChange={e => set('resources', e.target.value)} placeholder="Ngayagang Dharawal app, worksheets, vocabulary cards..." />
              </label>
            </div>
          </section>
        </div>

        {/* Right: preview */}
        <div className="lpb__preview-panel">
          <div className="lpb__preview-label">Preview</div>
          <div className="lpb__preview-scroll">
            <div className="lp-print">
              <div className="lp-print__banner">
                Ngayagang Dharawal — Sarah Redfern High School
              </div>

              <div className="lp-print__header">
                <h1 className="lp-print__title">Lesson Plan</h1>
                <table className="lp-print__info">
                  <tbody>
                    <tr>
                      <td>Teacher</td>
                      <td>{form.teacher || <span className="lp-print__blank-field">_______________</span>}</td>
                      <td>School</td>
                      <td>{form.school}</td>
                    </tr>
                    <tr>
                      <td>KLA</td>
                      <td>{klaObj.label}</td>
                      <td>Year Group</td>
                      <td>{form.yearGroup || <span className="lp-print__blank-field">_______________</span>}</td>
                    </tr>
                    <tr>
                      <td>Topic</td>
                      <td colSpan={3}>{form.topic || <span className="lp-print__blank-field">_______________</span>}</td>
                    </tr>
                    <tr>
                      <td>Duration</td>
                      <td>{form.duration}</td>
                      <td>Date</td>
                      <td>{form.date ? new Date(form.date).toLocaleDateString('en-AU') : today}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {form.learningIntention && (
                <div className="lp-print__section lp-print__section--intent">
                  <div className="lp-print__section-title">Learning Intention</div>
                  <p>{form.learningIntention}</p>
                </div>
              )}

              <div className="lp-print__section">
                <div className="lp-print__section-title">Syllabus Outcomes</div>
                <p style={{ whiteSpace: 'pre-line' }}>{form.outcomes || '...'}</p>
              </div>

              {selectedWords.length > 0 && (
                <div className="lp-print__section lp-print__section--vocab">
                  <div className="lp-print__section-title">Dharawal Language Integration</div>
                  <p className="lp-print__vocab-note">
                    The following Dharawal vocabulary will be embedded throughout this lesson.
                    Acknowledge that Dharawal language belongs to Dharawal people.
                  </p>
                  <table className="lp-print__vocab-table">
                    <thead>
                      <tr><th>English</th><th>Dharawal</th><th>Category</th></tr>
                    </thead>
                    <tbody>
                      {selectedWords.map(w => (
                        <tr key={w.english}>
                          <td>{w.english}</td>
                          <td className="lp-print__dh">{w.dharawal}</td>
                          <td>{w.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="lp-print__stages">
                <div className="lp-print__stage">
                  <div className="lp-print__stage-label">Introduction</div>
                  <div className="lp-print__stage-body">
                    {form.intro || <span className="lp-print__placeholder">Add introduction notes...</span>}
                  </div>
                </div>
                <div className="lp-print__stage">
                  <div className="lp-print__stage-label">Teaching and Learning Activities</div>
                  <div className="lp-print__stage-body" style={{ whiteSpace: 'pre-line' }}>
                    {form.body || <span className="lp-print__placeholder">Add teaching activities...</span>}
                  </div>
                </div>
                <div className="lp-print__stage">
                  <div className="lp-print__stage-label">Conclusion</div>
                  <div className="lp-print__stage-body">
                    {form.conclusion || <span className="lp-print__placeholder">Add conclusion...</span>}
                  </div>
                </div>
              </div>

              <div className="lp-print__bottom">
                <div className="lp-print__section">
                  <div className="lp-print__section-title">Assessment</div>
                  <p>{form.assessment || <span className="lp-print__placeholder">Add assessment strategy...</span>}</p>
                </div>
                <div className="lp-print__section">
                  <div className="lp-print__section-title">Resources</div>
                  <p>{form.resources || <span className="lp-print__placeholder">List resources...</span>}</p>
                </div>
              </div>

              <div className="lp-print__footer">
                This lesson plan was created using the Ngayagang Dharawal learning tool.
                Dharawal language and cultural knowledge belong to Dharawal people.
                For formal or public use, seek guidance from Dharawal community representatives.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
