import { useState, useEffect } from 'react';
import './LandingPage.css';

export default function LandingPage({ onEnter }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`landing ${loaded ? 'landing--loaded' : ''}`}>
      {/* Aboriginal art background */}
      <div className="landing__bg">
        <img
          src={`${import.meta.env.BASE_URL}images/aboriginal-art.png`}
          alt="Aboriginal Dharawal dot art"
          className="landing__bg-img"
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div className="landing__bg-overlay" />
      </div>

      {/* Animated dot patterns */}
      <div className="landing__dots landing__dots--1" />
      <div className="landing__dots landing__dots--2" />

      {/* Content */}
      <div className="landing__content">
        <div className="landing__logo-wrap">
          <div className="landing__logo-frame">
            <div className="landing__logo-inner">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Sarah Redfern High School"
                className="landing__logo"
                onError={e => { e.target.parentElement.parentElement.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>

        <div className="landing__title-wrap">
          <h1 className="landing__title">Ngayagang<br/>Dharawal</h1>
          <p className="landing__subtitle">Sarah Redfern High School</p>
          <p className="landing__country">Nura Kalboonya, Land of the Lyrebird</p>
        </div>

        <div className="landing__bottom">
          <div className="landing__dot-divider">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="landing__dot-dot" style={{ '--i': i }} />
            ))}
          </div>
          <button className="landing__enter" onClick={onEnter}>
            Naggangbi
          </button>
          <p className="landing__hint">Press to begin your journey</p>
        </div>
      </div>
    </div>
  );
}
