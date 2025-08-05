'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CompanyCarousel.css';

const CompanyCarousel = () => {
  const images = [
    '/assets/img/logo/logo_white.png',
    '/assets/img/logo/logo_white.png',
    '/assets/img/logo/logo_white.png',
    '/assets/img/logo/logo_white.png',
    '/assets/img/logo/logo_white.png',
    '/assets/img/logo/logo_white.png',
    '/assets/img/logo/logo_white.png',
  ];

  const trackRef = useRef(null);
  const slides = [...images, ...images, ...images, ...images];
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
    <div className="infinite-carousel-container">
      <div className="infinite-carousel-track" ref={trackRef}>
        {slides.map((img, index) => (
          <div 
            key={index}
            className="infinite-carousel-slide"
          >
            <img
              src={img}
              alt={`Partner ${index}`}
              className="infinite-carousel-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCarousel;