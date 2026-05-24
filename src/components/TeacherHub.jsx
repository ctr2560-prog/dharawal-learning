import { useState } from 'react';
import WorksheetBuilder from './WorksheetBuilder.jsx';
import LessonPlanBuilder from './LessonPlanBuilder.jsx';
import './TeacherHub.css';

export default function TeacherHub({ onBack }) {
  const [mode, setMode] = useState(null);

  if (mode === 'worksheet') return <WorksheetBuilder onBack={() => setMode(null)} />;
  if (mode === 'lessonplan') return <LessonPlanBuilder onBack={() => setMode(null)} />;

  return (
    <div className="hub">
      <div className="hub__header">
        <button className="hub__back" onClick={onBack}>‹</button>
        <div>
          <h2 className="hub__title">Teacher Resources</h2>
          <p className="hub__sub">Create printable resources with Dharawal language</p>
        </div>
      </div>

      <div className="hub__body">
        <p className="hub__intro">
          Build classroom resources that embed Dharawal language across Key Learning Areas.
          Select a resource type to get started.
        </p>

        <div className="hub__options">
          <button className="hub__option" onClick={() => setMode('worksheet')}>
            <div className="hub__option-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="6" y="4" width="36" height="40" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                <line x1="13" y1="14" x2="35" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="13" y1="21" x2="35" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="13" y1="28" x2="28" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="13" y1="35" x2="22" y2="35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="hub__option-title">Worksheet Builder</h3>
            <p className="hub__option-desc">
              Create vocabulary practice sheets, matching activities, and fill-in-the-blank
              exercises. Choose your KLA and the Dharawal words to include.
            </p>
            <span className="hub__option-types">
              Vocabulary Practice &bull; Matching &bull; Word Bank
            </span>
          </button>

          <button className="hub__option" onClick={() => setMode('lessonplan')}>
            <div className="hub__option-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="6" y="4" width="36" height="40" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                <rect x="13" y="12" width="22" height="6" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="13" y1="25" x2="35" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="13" y1="31" x2="35" y2="31" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="13" y1="37" x2="25" y2="37" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="hub__option-title">Lesson Plan Builder</h3>
            <p className="hub__option-desc">
              Generate a structured NSW lesson plan with Dharawal language integration
              points built in. Covers all lesson stages and syllabus outcomes.
            </p>
            <span className="hub__option-types">
              NSW Format &bull; All KLAs &bull; Syllabus Outcomes
            </span>
          </button>
        </div>
      </div>

      <div className="hub__footer">
        <p className="hub__disclaimer">
          Resources use educational vocabulary only. Dharawal language and cultural
          knowledge belong to Dharawal people. Please use respectfully.
        </p>
      </div>
    </div>
  );
}
