import React, { useRef, useState, useEffect } from 'react';
import style from './AudioIndicator.css';

const AudioIndicator = ({ isAudioPlaying, toggleAudioIndicator }) => {
  const audioElementRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !audioElementRef.current) return;

    if (isAudioPlaying) {
      audioElementRef.current.play().catch((err) => {
        console.error("Audio play failed:", err);
      });
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying, hasMounted]);

  if (!hasMounted) return null; // vermeidet Hydration-Mismatch

  return (
    <div className="sound-wrapper">
      <button onClick={toggleAudioIndicator} className="sound-btn">
        <audio
          ref={audioElementRef}
          className="hidden"
          src="/assets/audio/mhinpang_sound.mp3"
          loop
        />
        <div className={`sound-wave ${isAudioPlaying ? 'active' : ''}`}>
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={`bar ${isAudioPlaying ? 'active' : ''}`}
              style={{
                animationDelay: `${bar * 0.1}s`,
                animationDuration: `${(bar + 1) * 150}ms`,
              }}
            />
          ))}
        </div>
      </button>
    </div>
  );
};

export default AudioIndicator;
