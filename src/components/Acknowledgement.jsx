import { useState, useEffect } from 'react';
import './Acknowledgement.css';

export default function Acknowledgement({ onNext }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`ack ${loaded ? 'ack--loaded' : ''}`}>
      {/* Aboriginal art background */}
      <div className="ack__bg">
        <img
          src={`${import.meta.env.BASE_URL}images/aboriginal-art.png`}
          alt=""
          className="ack__bg-img"
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div className="ack__bg-overlay" />
      </div>

      {/* Animated dot patterns */}
      <div className="ack__dots ack__dots--1" />
      <div className="ack__dots ack__dots--2" />

      <div className="ack__content">
        <div className="ack__card">
          <p className="ack__eyebrow">Acknowledgement of Country</p>

          <div className="ack__dot-divider">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="ack__dot-dot" style={{ '--i': i }} />
            ))}
          </div>

          <p className="ack__body">
            Sarah Redfern High School acknowledges and respects{' '}
            <em>Kalboonya</em> and <em>Burri Burri Nura</em> (Land of the
            Lyrebird and Whale) &mdash; Dharawal Country. We honour the
            traditional owners and elders of the past, present and those
            emerging, passing down knowledge continuing connection to Country.
          </p>

          <p className="ack__body">
            This application was made through the knowledge of{' '}
            <em>Mabarraa</em> (Uncle) Shayne Williams and thank him for his
            tireless efforts to extend and sustain Dharawal language and
            histories for all learners.
          </p>

          <button className="ack__next" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
