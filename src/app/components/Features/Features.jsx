"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Features.css';

const Card = ({ src, title, description, className, buttonHref, isGif }) => {
  const [isClient, setIsClient] = useState(false);
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsClient(true);  // Clientseitig einschalten
  }, []);


  // Mouse tracking for glow effect
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      wrapper.style.setProperty('--mouse-x', `${x}%`);
      wrapper.style.setProperty('--mouse-y', `${y}%`);
    };

    wrapper.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (video && !isGif) {
      video.play().catch((e) => {
        console.error('Error playing video:', e);
      });
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video && !isGif) {
      video.pause();
      video.currentTime = 0;
    }
  };

return (
    <div
      ref={wrapperRef}
      className={`card-home-features-wrapper ${className}`} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {isGif ? (
        <img 
          src={src} 
          alt={title} 
          className="card-home-features-video" 
        />
      ) : (
        // Nur clientseitig das Video rendern, sonst null (kein Server-Video)
        isClient ? (
          <video
            ref={videoRef}
            src={src}
            loop
            muted
            className="card-home-features-video"
            onError={(e) => console.error('Error loading video:', e)}
          />
        ) : null
      )}

      {/* Content bleibt gleich */}
      <div className="card-home-features-content">
        <div>
          <h3 className="card-home-features-title">{title}</h3>
          {description && (
            <p className="card-home-features-description">{description}</p>
          )}
        </div>
        
        <a 
          href={buttonHref} 
          className="card-home-features-button"
          aria-label={`View ${title} project`}
        >
          View Project
          <ArrowUpRight 
            className="card-home-features-button-icon" 
            size={16} 
          />
        </a>
      </div>
    </div>
  );
};

const CardHomeFeatures = () => {
  return (
    <section className="card-home-features-section">
      {/* Floating Background Elements */}
      <div className="card-home-features-orb card-home-features-orb-1"></div>
      <div className="card-home-features-orb card-home-features-orb-2"></div>
      
      <div className="card-home-features-container">
        
        {/* Header Section */}
        <header className="card-home-features-intro" id="ScrollToFeatures">
          <h2 className="card-home-features-intro-text">
            Featured Projects
          </h2>
          <p className="card-home-features-intro-description">
            Discover our latest work showcasing innovative solutions, 
            cutting-edge design, and exceptional craftsmanship across various industries.
          </p>
        </header>

        {/* Large Featured Card */}
        <div className="card-home-features-grid-large">
          <Card
            src="/assets/videos/drift.mp4"
            title="Raijin"
            description="Offer personalized workout plans with video tutorials and AI form correction for optimal fitness results."
            className="card-home-features-large"
            buttonHref="/project1"
          />
        </div>

        {/* Main Feature Grid */}
        <div className="card-home-features-grid-feature">
          <Card
            src="/assets/videos/Video3.mp4"
            title="Nyx"
            description="Recommend songs based on the user's mood using AI and sentiment analysis for the perfect soundtrack."
            className="card-home-features-long"
            buttonHref="/project2"
          />
          <Card
            src="/assets/videos/Video2.mp4"
            title="Kitsune"
            description="Develop a branching narrative game where choices affect the outcome and create unique storytelling experiences."
            className="card-home-features-medium"
            buttonHref="/portfolio"
          />
          <Card
            src="/assets/videos/redfire.mp4"
            title="Oblivion"
            description="Let users try products in AR before purchasing, such as furniture or clothes, for confident decision-making."
            className="card-home-features-small"
            buttonHref="/project4"
          />
        </div>

        {/* Special Grid Section */}
        <div className="card-home-features-grid-special">
          <Card
            src="/assets/img/Gifs/Ringsblack.gif"
            title="Arcadia"
            description="Immersive digital experiences that blend creativity with cutting-edge technology for lasting impact!"
            className="card-home-features-xsmall2"
            buttonHref="/project6"
            isGif={true}  // ← wichtig!
          />
          <Card
            src="/assets/img/LandingBG/OniBoy1.webp"
            title="Arcadia"
            description="Immersive digital experiences that blend creativity with cutting-edge technology for lasting impact."
            className="card-home-features-xsmall2"
            buttonHref="/project6"
            isGif={true}
          />
        </div>

      </div>
    </section>
  );
};

export default CardHomeFeatures;