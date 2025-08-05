'use client';
import { useState, useEffect } from 'react';
import preloadAssets from "./preloadAssets";
import './Preload.css';

const Preload = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredKanjiIndex, setHoveredKanjiIndex] = useState(-1);

  const kanjiData = [
    { bg: '1技', inner: '1術', explanation: 'Technology/Skill' },
    { bg: '2創', inner: '2造', explanation: 'Creation/Design' },
    { bg: '3計', inner: '3算', explanation: 'Calculation/Algorithm' },
    { bg: '4情', inner: '4報', explanation: 'Information/Data' },
    { bg: '5構', inner: '5築', explanation: 'Structure/Architecture' },
    { bg: '6開', inner: '6発', explanation: 'Development/Coding' }
];


useEffect(() => {
  let loadedCount = 0;
  const totalAssets = preloadAssets.length;

  if (totalAssets === 0) {
    setIsLoaded(true);
    return;
  }

  const updateProgress = () => {
    loadedCount++;
    setProgress(Math.round((loadedCount / totalAssets) * 100));
    if (loadedCount === totalAssets) {
      setTimeout(() => setIsLoaded(true), 500);
    }
  };
  preloadAssets.forEach((asset) => {
    if (asset.type === "image") {
      const img = new Image();
      img.src = asset.path;
      img.onload = updateProgress;
      img.onerror = () => {
        console.error(`Fehler beim Laden von Bild: ${asset.path}`);
        updateProgress();
      };
    } else if (asset.type === "video") {
      const video = document.createElement("video");
      video.src = asset.path;
      video.preload = "auto"; // Automatisch vorladen
      video.oncanplaythrough = updateProgress; // Fortschritt erst zählen, wenn Video abspielbar ist
      video.onerror = () => {
        console.error(`Fehler beim Laden von Video: ${asset.path}`);
        updateProgress();
      };
    } else if (asset.type === "component" || asset.type === "page") {
      asset.path()
        .then(updateProgress)
        .catch((error) => {
          console.error(`Fehler beim Laden der Seite: ${asset.path}`, error);
          updateProgress();
        });
    }
  });
  
  
}, []);


  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => onLoaded?.(), 800);
  };

  if (!isVisible) return null;

  return (
    <div className={`preloader ${!isVisible ? 'loaded' : ''}`}>
      <div className="kanji-background">
        {kanjiData.map((kanji, index) => (
          <div
            key={index}
            className={`kanji-bg-text ${hoveredKanjiIndex === index ? 'hovered-kanji' : ''}`}
            onMouseEnter={() => setHoveredKanjiIndex(index)}
            onMouseLeave={() => setHoveredKanjiIndex(-1)}
          >
            {kanji.bg}
            <div className={`kanji-tooltip ${hoveredKanjiIndex === index ? 'visible' : ''}`}>
              {kanji.explanation}
            </div>
          </div>
        ))}
      </div>

      <div className="progress-percent">
        {Math.round(progress)}%
      </div>

      <div className="loader-core">
        <div className="glow-effect" />
        
        <div className="quantum-ring">
          {kanjiData.slice(0, 3).map((kanji, index) => (
            <div
              key={index}
              className={`kanji-inner-circle-rotator ${hoveredKanjiIndex === index ? 'active-inner-kanji' : ''}`}
            >
              {kanji.inner}
            </div>
          ))}
        </div>

        <div className="quantum-ring" style={{ animationDelay: '-4s' }}>
          {kanjiData.slice(3, 6).map((kanji, index) => (
            <div
              key={index + 3}
              className={`kanji-inner-circle-rotator ${hoveredKanjiIndex === index + 3 ? 'active-inner-kanji' : ''}`}
            >
              {kanji.inner}
            </div>
          ))}
        </div>

        <div className="progress-hud">
          <div className="gif-container">
            <img
              src="/assets/img/logo/logo_white.png"
              className="hologram-gif"
              alt="loading"
            />
          </div>
        </div>
      </div>

      <button className={`enter-portal ${isLoaded ? "visible" : ""}`} onClick={handleEnter} disabled={!isLoaded}>
        <span className="japanese-text">Enter 起動</span>
      </button>
    </div>
  );
};

export default Preload;