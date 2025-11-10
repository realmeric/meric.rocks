"use client";
import { useEffect, useMemo, useState } from 'react';
import { useLanyard } from '../hooks/useLanyard';

const TARGET_SONG = 'yas marina';
const ACCENT_COLOR = '#5aabe3';
const ORIGIN_EVENT = 'yas-marina-origin';

type TransitionOrigin = {
  x: number;
  y: number;
};

export default function YasMarinaMode() {
  const { data } = useLanyard();

  const yasMarinaState = useMemo(() => {
    const rawSong = data?.spotify?.song ?? '';
    const normalizedSong = rawSong.trim().toLowerCase();
    const isActive =
      Boolean(data?.listening_to_spotify) &&
      rawSong.length > 0 &&
      normalizedSong === TARGET_SONG;

    return {
      isActive,
      song: rawSong,
      artist: data?.spotify?.artist ?? '',
      album: data?.spotify?.album ?? '',
      art: data?.spotify?.album_art_url ?? '',
      timestamps: data?.spotify?.timestamps ?? null,
    };
  }, [data]);

  const [modeActive, setModeActive] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);
  const [origin, setOrigin] = useState<TransitionOrigin | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOrigin = (event: Event) => {
      const customEvent = event as CustomEvent<TransitionOrigin>;
      if (customEvent.detail) {
        setOrigin(customEvent.detail);
      }
    };

    window.addEventListener(ORIGIN_EVENT, handleOrigin as EventListener);
    return () => {
      window.removeEventListener(ORIGIN_EVENT, handleOrigin as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!yasMarinaState.isActive) {
      setShowTransition(false);
      setModeActive(false);
      return;
    }

    if (!modeActive) {
      setShowTransition(true);
      setTransitionKey(prev => prev + 1);
    }
  }, [yasMarinaState.isActive, modeActive]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (!body) return;

    if (modeActive) {
      body.classList.add('yas-marina-mode');
      body.style.setProperty('--yas-marina-accent', ACCENT_COLOR);
    } else {
      body.classList.remove('yas-marina-mode');
      body.style.removeProperty('--yas-marina-accent');
    }

    return () => {
      body.classList.remove('yas-marina-mode');
      body.style.removeProperty('--yas-marina-accent');
    };
  }, [modeActive]);

  const handleTransitionEnd = () => {
    setShowTransition(false);
    if (yasMarinaState.isActive) {
      setModeActive(true);
    }
  };

  if (!modeActive && !showTransition) {
    return null;
  }

  const circleLeft = origin ? `${origin.x}px` : '50vw';
  const circleTop = origin ? `${origin.y}px` : '50vh';

  return (
    <>
      {showTransition && (
        <div className="yas-marina-transition" aria-hidden="true">
          <span
            key={transitionKey}
            className="yas-marina-transition__circle"
            style={{ left: circleLeft, top: circleTop }}
            onAnimationEnd={handleTransitionEnd}
          />
        </div>
      )}

      {modeActive && (
        <>
          <div className="yas-marina-banner" role="status" aria-live="polite">
            <div className="yas-marina-banner__glow" />
            {yasMarinaState.art ? (
              <span
                className="yas-marina-banner__art"
                style={{ backgroundImage: `url(${yasMarinaState.art})` }}
              />
            ) : (
              <span className="yas-marina-banner__art yas-marina-banner__art--placeholder" />
            )}
            <div className="yas-marina-banner__content">
              <p className="yas-marina-banner__eyebrow">Yas Marina takeover</p>
              <p className="yas-marina-banner__title">{yasMarinaState.song}</p>
              <p className="yas-marina-banner__meta">
                {yasMarinaState.artist || 'Spotify'}
                {yasMarinaState.album ? ` • ${yasMarinaState.album}` : ''}
              </p>
            </div>
            <div className="yas-marina-banner__wave">
              <span />
              <span />
              <span />
            </div>
          </div>
        </>
      )}
    </>
  );
}
