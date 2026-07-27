import './MainMenu.css';

const icons = {
  chat: (
    <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="6" width="26" height="18" rx="4" stroke="white" strokeWidth="2.5" fill="none"/><path d="M8 30 L4 36 L14 30" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/><line x1="10" y1="13" x2="24" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="10" y1="19" x2="20" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
  ),
  cards: (
    <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="10" width="22" height="26" rx="3" stroke="white" strokeWidth="2.5" fill="none"/><rect x="14" y="4" width="22" height="26" rx="3" stroke="white" strokeWidth="2" strokeOpacity="0.5" fill="none"/><line x1="10" y1="20" x2="20" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="10" y1="26" x2="17" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
  ),
  blanks: (
    <svg viewBox="0 0 40 40" fill="none"><path d="M28 4 L36 12 L14 34 L6 34 L6 26 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/><line x1="22" y1="10" x2="30" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="4" y1="38" x2="36" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.4"/></svg>
  ),
  colour: (
    <svg viewBox="0 0 40 40" fill="none"><path d="M10 32 C10 32 6 28 6 22 C6 14 12 8 20 8 C28 8 34 14 34 22 C34 28 30 32 30 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/><circle cx="14" cy="24" r="2.5" fill="white" opacity="0.6"/><circle cx="20" cy="28" r="2.5" fill="white" opacity="0.6"/><circle cx="26" cy="24" r="2.5" fill="white" opacity="0.6"/><circle cx="20" cy="18" r="2.5" fill="white" opacity="0.6"/><path d="M18 32 L22 32 L21 38 L19 38 Z" fill="white" strokeWidth="0"/></svg>
  ),
  wordlist: (
    <svg viewBox="0 0 40 40" fill="none"><rect x="6" y="4" width="28" height="32" rx="3" stroke="white" strokeWidth="2.5" fill="none"/><line x1="12" y1="13" x2="28" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="12" y1="20" x2="28" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="12" y1="27" x2="22" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
  ),
  jeopardy: (
    <svg viewBox="0 0 40 40" fill="none">
      <rect x="3" y="4" width="34" height="8" rx="2" stroke="white" strokeWidth="2" fill="none"/>
      <rect x="3" y="16" width="34" height="8" rx="2" stroke="white" strokeWidth="2" fill="none"/>
      <rect x="3" y="28" width="34" height="8" rx="2" stroke="white" strokeWidth="2" fill="none"/>
      <line x1="15" y1="4" x2="15" y2="36" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
      <line x1="25" y1="4" x2="25" y2="36" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
    </svg>
  ),
  feud: (
    <svg viewBox="0 0 40 40" fill="none">
      <circle cx="10" cy="14" r="5" stroke="white" strokeWidth="2.5" fill="none"/>
      <path d="M2 32 C2 26 18 26 18 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="14" r="5" stroke="white" strokeWidth="2.5" fill="none"/>
      <path d="M22 32 C22 26 38 26 38 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <line x1="20" y1="5" x2="20" y2="35" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
    </svg>
  ),
  speedround: (
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M24 4 L10 24 H20 L16 36 L30 16 H20 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  scramble: (
    <svg viewBox="0 0 40 40" fill="none">
      <rect x="3" y="4" width="14" height="14" rx="3" stroke="white" strokeWidth="2.5" fill="none"/>
      <rect x="23" y="4" width="14" height="14" rx="3" stroke="white" strokeWidth="2.5" fill="none"/>
      <rect x="13" y="22" width="14" height="14" rx="3" stroke="white" strokeWidth="2.5" fill="none"/>
      <path d="M18 11 C22 11 22 11 26 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M23 8 L26 11 L23 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  animalsounds: (
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M6 15 H12 L21 7 V33 L12 25 H6 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <path d="M27 14 C30 17 30 23 27 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M32 9 C37 15 37 25 32 31" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" fill="none"/>
    </svg>
  ),
  teacher: (
    <svg viewBox="0 0 40 40" fill="none"><rect x="4" y="6" width="32" height="22" rx="3" stroke="white" strokeWidth="2.5" fill="none"/><line x1="20" y1="28" x2="20" y2="34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="12" y1="34" x2="28" y2="34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="10" y1="14" x2="22" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="10" y1="19" x2="18" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="29" cy="17" r="4" stroke="white" strokeWidth="2" fill="none"/><line x1="32" y1="20" x2="35" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
};

const SECTIONS = [
  {
    label: 'Learn',
    cards: [
      { id: 'chat',      title: 'Dharawal Translator', sub: 'Chat and translate words',    color: '#1a2db0' },
      { id: 'cards',     title: 'Word Matching',       sub: 'Match images to words',       color: '#c41230' },
      { id: 'blanks',    title: 'Fill the Blanks',     sub: 'Test your knowledge',         color: '#0d4a8a' },
      { id: 'colour',    title: 'Colouring In',        sub: 'Colour Dharawal art',         color: '#3d1270' },
      { id: 'wordlist',  title: 'Word List',           sub: 'Browse all vocabulary',       color: '#0a4a2a' },
    ],
  },
  {
    label: 'Games',
    cards: [
      { id: 'jeopardy',   title: 'Jeopardy',     sub: 'Categories and points',       color: '#1a4a82' },
      { id: 'feud',       title: 'Family Feud',   sub: 'Team guessing game',          color: '#6a1fd0' },
      { id: 'speedround', title: 'Speed Round',   sub: 'Answer as fast as you can',   color: '#b07800' },
      { id: 'scramble',   title: 'Word Scramble', sub: 'Unscramble Dharawal words',   color: '#0e6655' },
      { id: 'animalsounds', title: 'Animal Sounds', sub: 'Guess the animal you hear', color: '#0a5c7a' },
    ],
  },
  {
    label: 'Teach',
    cards: [
      { id: 'teacher', title: 'Teacher Resources', sub: 'Build worksheets and lesson plans', color: '#5a2d82' },
    ],
  },
];

export default function MainMenu({ onNavigate }) {
  return (
    <div className="menu">
      <div className="menu__header dot-bg">
        <div className="menu__header-content">
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="Sarah Redfern"
            className="menu__logo"
            onError={e => { e.target.style.display = 'none'; }}
          />
          <div>
            <h1 className="menu__title">Ngayagang Dharawal</h1>
            <p className="menu__school">Sarah Redfern High School</p>
          </div>
        </div>
        <p className="menu__welcome">Welcome! Choose an activity below</p>
      </div>

      <div className="menu__sections">
        {SECTIONS.map(section => (
          <div key={section.label} className="menu__section">
            <div className="menu__section-label">{section.label}</div>
            <div className={`menu__grid menu__grid--${section.cards.length}`}>
              {section.cards.map(f => (
                <button
                  key={f.id}
                  className="menu__card"
                  style={{ '--card-color': f.color }}
                  onClick={() => onNavigate(f.id)}
                >
                  <span className="menu__card-icon">{icons[f.id]}</span>
                  <span className="menu__card-title">{f.title}</span>
                  <span className="menu__card-sub">{f.sub}</span>
                  <div className="menu__card-dots">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span key={i} className="menu__card-dot" />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="menu__footer">
        <div className="menu__acknowledgement">
          <p>We acknowledge the Dharawal people as the traditional</p>
          <p>custodians of this land, <em>Nura Kalboonya</em></p>
        </div>
      </div>
    </div>
  );
}
