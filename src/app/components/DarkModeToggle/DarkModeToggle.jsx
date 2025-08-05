import React, { useCallback, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring'; // React Spring für Animationen
import styles from './DarkModeToggle.css'; // Importiert die Styles

const DarkModeToggle = ({ toggleDarkMode, isDarkMode }) => {
  const [initialRender, setInitialRender] = useState(true);

  // Initialisierung der Animationseinstellungen
  const moonProps = useSpring({
    opacity: isDarkMode ? 1 : 0,
    transform: isDarkMode 
      ? 'scale(1) rotate(0deg)' 
      : 'scale(0.5) rotate(45deg)',
    config: { tension: 200, friction: 25, precision: 0.01 },
    from: { opacity: 0, transform: 'scale(0.5) rotate(45deg)' },
    delay: initialRender ? 0 : 200, // Verhindert Delay beim ersten Rendern
  });

  const sunProps = useSpring({
    opacity: isDarkMode ? 0 : 1,
    transform: isDarkMode 
      ? 'scale(0.5) rotate(-45deg)' 
      : 'scale(1) rotate(0deg)',
    config: { tension: 200, friction: 25, precision: 0.01 },
    from: { opacity: 0, transform: 'scale(0.5) rotate(-45deg)' },
    delay: initialRender ? 0 : 200,
  });

  // Handle Toggle Dark Mode
  const handleToggle = useCallback(() => {
    toggleDarkMode(); // ruft die toggleDarkMode-Funktion auf
  }, [toggleDarkMode]);

  // Effekt um initiale Anzeige zu korrigieren
  useEffect(() => {
    if (initialRender) {
      setInitialRender(false); // Verhindert den initialen Zustand der Verzögerung
    }
  }, [initialRender]);

  return (
    <div 
      className="darkmode-toggle" 
      onClick={handleToggle} 
      aria-label={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
    >
      <div className="svg-container">
        
        {/* Dark Mode SVG (Mond-Symbol) */}
        <animated.svg
          className="svg-icon dark-mode-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 316.000000 290.000000"
          preserveAspectRatio="xMidYMid meet"
          style={moonProps} // Verwendet die Animationseigenschaften
        >
          <g transform="translate(0.000000,290.000000) scale(0.100000,-0.100000)" stroke="none">
            <path d="M1174 2635 c-410 -106 -721 -429 -816 -849 -25 -108 -29 -336 -9 -431 36 -173 88 -298 178 -433 204 -307 553 -492 928 -492 441 0 825 243 1014 641 43 91 86 227 97 311 6 45 5 51 -10 45 -114 -44 -393 -48 -540 -8 -282 78 -532 294 -647 561 -63 148 -74 204 -74 395 0 127 4 184 17 228 l16 57 -31 0 c-18 -1 -73 -12 -123 -25z"/>
          </g>
        </animated.svg>

        {/* Light Mode SVG (Sonnen-Symbol) */}
        <animated.svg
          className="svg-icon light-mode-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 16 16"
          fill="currentColor"
          style={sunProps} // Verwendet die Animationseigenschaften
        >
          <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8.5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707M3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707"/>
        </animated.svg>
      </div>
    </div>
  );
};

export default DarkModeToggle;
