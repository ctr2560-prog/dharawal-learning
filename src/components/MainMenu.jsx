import './MainMenu.css';

const icons = {
  chat: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="26" height="18" rx="4" stroke="white" strokeWidth="2.5" fill="none"/>
      <path d="M8 30 L4 36 L14 30" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <line x1="10" y1="13" x2="24" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="10" y1="19" x2="20" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  cards: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="22" height="26" rx="3" stroke="white" strokeWidth="2.5" fill="none"/>
      <rect x="14" y="4" width="22" height="26" rx="3" stroke="white" strokeWidth="2" strokeOpacity="0.5" fill="none"/>
      <line x1="10" y1="20" x2="20" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="10" y1="26" x2="17" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  blanks: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 4 L36 12 L14 34 L6 34 L6 26 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <line x1="22" y1="10" x2="30" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="4" y1="38" x2="36" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.4"/>
    </svg>
  ),
  colour: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 32 C10 32 6 28 6 22 C6 14 12 8 20 8 C28 8 34 14 34 22 C34 28 30 32 30 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="14" cy="24" r="2.5" fill="white" opacity="0.6"/>
      <circle cx="20" cy="28" r="2.5" fill="white" opacity="0.6"/>
      <circle cx="26" cy="24" r="2.5" fill="white" opacity="0.6"/>
      <circle cx="20" cy="18" r="2.5" fill="white" opacity="0.6"/>
      <path d="M18 32 L22 32 L21 38 L19 38 Z" fill="white" strokeWidth="0"/>
    </svg>
  ),
  wordlist: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="28" height="32" rx="3" stroke="white" strokeWidth="2.5" fill="none"/>
      <line x1="12" y1="13" x2="28" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="12" y1="20" x2="28" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="12" y1="27" x2="22" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
};

const FEATURES = [
  {
    id: 'chat',
    title: 'Dharawal Translator',
    subtitle: 'Chat and translate words',
    color: '#1a2db0',
  },
  {
    id: 'cards',
    title: 'Word Matching',
    subtitle: 'Match images to words',
    color: '#c41230',
  },
  {
    id: 'blanks',
    title: 'Fill the Blanks',
    subtitle: 'Test your knowledge',
    color: '#0d4a8a',
  },
  {
    id: 'colour',
    title: 'Colouring In',
    subtitle: 'Colour Dharawal art',
    color: '#3d1270',
  },
  {
    id: 'wordlist',
    title: 'Word List',
    subtitle: 'Browse all vocabulary',
    color: '#0a4a2a',
  },
];

export default function MainMenu({ onNavigate }) {
  return (
    <div className="menu">
      <div className="menu__header dot-bg">
        <div className="menu__header-content">
          <img
            src="/images/logo.png"
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

      <div className="menu__grid">
        {FEATURES.map(f => (
          <button
            key={f.id}
            className="menu__card"
            style={{ '--card-color': f.color }}
            onClick={() => onNavigate(f.id)}
          >
            <span className="menu__card-icon">{icons[f.id]}</span>
            <span className="menu__card-title">{f.title}</span>
            <span className="menu__card-sub">{f.subtitle}</span>
            <div className="menu__card-dots">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="menu__card-dot" />
              ))}
            </div>
          </button>
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
