"use client";
import { useMemo } from 'react';

const YACHT = '🛥️';
const COUNT = 24;

export default function YachtRain() {
  const yachts = useMemo(() => {
    return Array.from({ length: COUNT }).map((_, idx) => ({
      id: idx,
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 6,
      left: Math.random() * 100,
      scale: 0.8 + Math.random() * 0.6,
    }));
  }, []);

  return (
    <div className="yacht-rain" aria-hidden="true">
      {yachts.map((yacht) => (
        <span
          key={yacht.id}
          className="yacht-rain__item"
          style={{
            left: `${yacht.left}%`,
            animationDelay: `${yacht.delay}s`,
            animationDuration: `${yacht.duration}s`,
            fontSize: `${yacht.scale}rem`,
          }}
        >
          {YACHT}
        </span>
      ))}
    </div>
  );
}
