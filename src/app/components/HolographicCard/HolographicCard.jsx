'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './holoeffekte.css';

const useHolographicEffect = (cardRef) => {
  const [styleVars, setStyleVars] = useState({
    '--mx': '0%',
    '--my': '0%',
    '--posx': '0%',
    '--posy': '0%',
    '--hyp': '0',
    transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure the code runs only in the browser
    setIsClient(true);
  }, []);

  const isMobileOrTablet = isClient && window.innerWidth < 1024;

  const handleMouseMove = useCallback(
    (e) => {
      if (!isClient || isMobileOrTablet || !cardRef.current) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mvX = e.clientX - centerX;
      const mvY = e.clientY - centerY;

      const maxTilt = 15;
      const Xdeg = Math.min(Math.max((-mvY / (rect.height / 2)) * maxTilt, -maxTilt), maxTilt);
      const Ydeg = Math.min(Math.max((mvX / (rect.width / 2)) * maxTilt, -maxTilt), maxTilt);
      const hyp = Math.min(Math.sqrt(mvX ** 2 + mvY ** 2) / 50, 1);

      setStyleVars({
        '--mx': `${50 - Ydeg * 2}%`,
        '--my': `${50 + Xdeg * 2}%`,
        '--posx': `${50 + Ydeg / 2 + Xdeg * 0.5}%`,
        '--posy': `${50 + Xdeg / 2 + Ydeg / 2}%`,
        '--hyp': `${hyp}`,
        transform: `rotateX(${Xdeg}deg) rotateY(${Ydeg}deg) scale(1.05)`,
      });

      gsap.to(card, {
        duration: 0.3,
        transform: `rotateX(${Xdeg}deg) rotateY(${Ydeg}deg) scale(1.05)`,
        '--mx': `${50 - Ydeg * 2}%`,
        '--my': `${50 + Xdeg * 2}%`,
        '--posx': `${50 + Ydeg / 2 + Xdeg * 0.5}%`,
        '--posy': `${50 + Xdeg / 2 + Ydeg / 2}%`,
        '--hyp': hyp,
        ease: 'power4.out',
        zIndex: 999,
        position: 'relative',
      });

      const shine = card.querySelector('.card__shine');
      const glare = card.querySelector('.card__glare');
      if (shine) {
        gsap.to(shine, {
          duration: 4.0,
          delay: 0.1,
          backgroundPosition: `${50 - (mvX / rect.width) * 100}% ${50 + (mvY / rect.height) * 100}%`,
          ease: 'linear',
        });
      }
      if (glare) {
        gsap.to(glare, {
          duration: 4.0,
          delay: 0.1,
          backgroundPosition: `${50 - (mvX / rect.width) * 50}% ${50 + (mvY / rect.height) * 50}%`,
          ease: 'linear',
        });
      }
    },
    [isClient, isMobileOrTablet]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isClient || isMobileOrTablet || !cardRef.current) return;

    const card = cardRef.current;
    gsap.to(card, {
      duration: 0.6,
      zIndex: 1,
      position: 'relative',
      transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
      ease: 'power3.out',
    });

    setStyleVars({
      '--mx': '0%',
      '--my': '0%',
      '--posx': '0%',
      '--posy': '0%',
      '--hyp': '0',
      transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
    });

    const shine = card.querySelector('.card__shine');
    const glare = card.querySelector('.card__glare');
    if (shine) {
      gsap.to(shine, {
        duration: 1.0,
        backgroundPosition: '50% 50%',
        ease: 'sine.out',
      });
    }
    if (glare) {
      gsap.to(glare, {
        duration: 1.0,
        backgroundPosition: '50% 50%',
        ease: 'sine.out',
      });
    }
  }, [isClient, isMobileOrTablet]);

  useEffect(() => {
    if (!isClient) return;

    const card = cardRef.current;
    if (!card || isMobileOrTablet) return;

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, isClient, isMobileOrTablet]);

  return styleVars;
};

const HolographicCard = ({ imgSrc, category, rarity }) => {
  const cardRef = useRef(null);
  const styleVars = useHolographicEffect(cardRef);

  return (
    <div className="holographic__section" ref={cardRef}>
      <div
        className="card holographic"
        data-rarity={rarity}
        data-category={category}
        style={{
          ...styleVars,
          transition: 'transform 0.0s ease',
        }}
      >
        <div className="card__effects">
          <img src={imgSrc} alt="Card" className="card_images" />
          <div className="card__shine"></div>
          <div className="card__glare"></div>
        </div>
        <div className="project-hover-block">
          <div>View Project</div>
        </div>
      </div>
    </div>
  );
};

export default HolographicCard;
