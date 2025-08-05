'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './TextCarousel.css';

const TextCarousel = () => {
  const texts = [
    'Company A',
    'Company B',
    'Company C',
    'Company D',
    'Company E',
    'Company F',
    'Company G',
    'Company H',
  ];

  const trackRef = useRef(null);
  const slides = [...texts, ...texts, ...texts, ...texts];
  const tl = useRef();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 4;
      
      tl.current = gsap.timeline({ repeat: -1 }).to(track, {
        x: -totalWidth,
        duration: 20,
        ease: 'none',
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
        }
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div className="TextCarousel-container">
      <div className="TextCarousel-track" ref={trackRef}>
        {slides.map((text, index) => (
          <div 
            key={index}
            className="TextCarousel-slide"
          >
            <div className="TextCarousel-text">
              {text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextCarousel;
