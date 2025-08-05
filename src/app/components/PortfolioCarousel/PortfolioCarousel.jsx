"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Github, Mail, ExternalLink, Code2, Palette, Database } from 'lucide-react';
import './PortfolioCarousel.css';

const PortfolioCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const autoplayTimer = useRef(null);
  const progressTimer = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

// konstante für maus tracking
const handleCTAMouseMove = (e) => {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  
  // Berechne absolute Position der Maus relativ zum Button
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Setze die Glanz-Position direkt auf die Mausposition
  button.style.setProperty('--mouse-x', `${x}px`);
  button.style.setProperty('--mouse-y', `${y}px`);
};

const handleCTAMouseEnter = (e) => {
  const button = e.currentTarget;
  // Initialisiere Position beim ersten Hover
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  button.style.setProperty('--mouse-x', `${x}px`);
  button.style.setProperty('--mouse-y', `${y}px`);
};

const handleCTAMouseLeave = (e) => {
  const button = e.currentTarget;
  // Verstecke den Glanz außerhalb des Buttons
  button.style.setProperty('--mouse-x', '-100px');
  button.style.setProperty('--mouse-y', '-100px');
};


  // Professional Portfolio Slides
  const slides = [
  {
    id: 1,
    type: "video",
    src: "/assets/videos/sea.mp4",
    title: "Welcome to My Corner",
    subtitle: "Tips, Tricks & Real Talk",
    description: "No fluff, just useful insights and honest advice to help you level up your skills and projects.",
    cta: {
      text: "Dive Into the Blog",
      action: () => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" }),
      secondary: false,
    },
  },
  {
    id: 2,
    type: "image",
    src: "/assets/img/LandingBG/OniBoy1.webp",
    title: "Projects That Speak",
    subtitle: "What I've Built, What I've Learned",
    description: "A collection of real work, experiments, and passion projects — each with a story behind it.",
    cta: {
      text: "Check Them Out",
      icon: Mail,
      action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
      secondary: true,
    },
  },
  {
    id: 3,
    type: "video",
    src: "/assets/videos/tech.mp4",
    title: "Looking for the Next Challenge",
    subtitle: "Let's Create Something Together",
    description: "If you're looking for someone who cares as much as you do, let's chat and see how we can collaborate.",
    cta: {
      text: "Get in Touch",
      icon: Github,
      action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      secondary: false,
    },
  },
];


  const AUTOPLAY_INTERVAL = 6000;
  const PROGRESS_INTERVAL = 50;

  // Auto-play functionality
const startAutoplay = () => {
  if (!isAutoPlaying) return;

  // WICHTIG: Vorher stoppen
  clearInterval(progressTimer.current);
  
  let currentProgress = 0;
  setProgress(0);
  
  progressTimer.current = setInterval(() => {
    currentProgress += (PROGRESS_INTERVAL / AUTOPLAY_INTERVAL) * 100;
    setProgress(currentProgress);
    
    if (currentProgress >= 100) {
      clearInterval(progressTimer.current);
      nextSlide();
    }
  }, PROGRESS_INTERVAL);
};


  const stopAutoplay = () => {
    clearInterval(autoplayTimer.current);
    clearInterval(progressTimer.current);
    setProgress(0);
  };

  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
    stopAutoplay();
    setTimeout(startAutoplay, 100);
  };

  // Touch/Swipe handling
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    const touch = e.touches ? e.touches[0] : e;
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsAutoPlaying(false);
    stopAutoplay();
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches ? e.changedTouches[0] : e;
    
    const deltaX = touchStart.x - touch.clientX;
    const deltaY = Math.abs(touchStart.y - touch.clientY);
    
    if (Math.abs(deltaX) > 50 && deltaY < 100) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        setActiveSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
      }
    }
    
    setTimeout(() => {
      setIsAutoPlaying(true);
      startAutoplay();
    }, 100);
  };

  // Initialize autoplay
useEffect(() => {
  if (isAutoPlaying) {
    startAutoplay();
    return () => stopAutoplay();
  }
}, [isAutoPlaying]);


  // Pause on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAutoPlaying(false);
        stopAutoplay();
      } else {
        setIsAutoPlaying(true);
        startAutoplay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <>
      <section className="landing-carousel">
        {/* Background Elements */}
        <div className="landing-carousel__bg-orb landing-carousel__bg-orb--1"></div>
        <div className="landing-carousel__bg-orb landing-carousel__bg-orb--2"></div>
        
        {/* Main Carousel Container */}
        <div 
          className="landing-carousel__container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
        >
          {/* Slides */}
          <div className="landing-carousel__slides">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`landing-carousel__slide ${
                  index === activeSlide ? 'landing-carousel__slide--active' : ''
                }`}
              >
                {/* Media Content */}
                <div className="landing-carousel__media">
                  {slide.type === 'video' && isClient ? (
  <video
    className="landing-carousel__video"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src={slide.src} type="video/mp4" />
  </video>
) : slide.type === 'image' ? (
  <img
    className="landing-carousel__image"
    src={slide.src}
    alt={slide.title}
    loading={index === activeSlide ? 'eager' : 'lazy'}
  />
) : null}

                  
                  {/* Overlay Gradient */}
                  <div className="landing-carousel__overlay"></div>
                </div>

                {/* Content */}
                <div className="landing-carousel__content">
                  <div className="landing-carousel__text">
                    <p className="landing-carousel__subtitle">{slide.subtitle}</p>
                    <h1 className="landing-carousel__title">{slide.title}</h1>
                    <p className="landing-carousel__description">{slide.description}</p>
                    
                    {/* Call to Action button */}
                    <button
                      className={`landing-carousel__cta ${
                        slide.cta.secondary ? 'landing-carousel__cta--secondary' : ''
                      }`}
                      onClick={slide.cta.action}
                      onMouseMove={handleCTAMouseMove}
                      onMouseEnter={handleCTAMouseEnter}
                      onMouseLeave={handleCTAMouseLeave}
                    >
                      {slide.cta.icon && <slide.cta.icon size={20} />}
                      <span>{slide.cta.text}</span>
                      <ArrowRight className="landing-carousel__cta-icon" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <nav className="landing-carousel__nav">
            <div className="landing-carousel__nav-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`landing-carousel__nav-dot ${
                    index === activeSlide ? 'landing-carousel__nav-dot--active' : ''
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Zu Slide ${index + 1}`}
                >
                  {index === activeSlide && (
                    <div 
                      className="landing-carousel__nav-progress"
                      style={{ width: `${progress}%` }}
                    ></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Slide Counter */}
            <div className="landing-carousel__counter">
              <span className="landing-carousel__counter-current">
                {String(activeSlide + 1).padStart(2, '0')}
              </span>
              <span className="landing-carousel__counter-separator">/</span>
              <span className="landing-carousel__counter-total">
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </nav>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow" onClick={() => document.getElementById('ScrollToFeatures')?.scrollIntoView({ behavior: 'smooth' })}>
            <ArrowRight className="scroll-arrow-icon" size={24} />
          </div>
          <span className="scroll-text">Scrollen für mehr</span>
        </div>
      </section>

    </>
  );
};

export default PortfolioCarousel;