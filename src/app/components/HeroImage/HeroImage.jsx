'use client';


// components/HeroImage.js
import './HeroImages.css'; 
export default function HeroImage({ imageSrc, altText }) {
    return (
      <div className="ProjectGrid">
        <div className="ProjectOverlay"></div>
        <img
          src={imageSrc}
          alt={altText}
          className="ProjectHeroImg"
        />
      </div>
    );
  }
  