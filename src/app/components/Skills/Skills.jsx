"use client";

import { useState } from 'react';
import './skill.css';

const skillsData = {
  coding: [
    { title: "HTML5", icon: "/assets/img/skills/html.webp" },
    { title: "CSS3", icon: "/assets/img/skills/css.webp" },
    { title: "SASS", icon: "/assets/img/skills/sass.webp" },
    { title: "JavaScript", icon: "/assets/img/skills/js.webp" },
    { title: "React", icon: "/assets/img/skills/react.webp" },
    { title: "Next.js", icon: "/assets/img/skills/nextjs.svg" },
  ],
  software: [
    { title: "Apache", icon: "/assets/img/skills/apache.webp" },
    { title: "Linux (SSH, VPS)", icon: "/assets/img/skills/Linux.webp" },
    { title: "Git", icon: "/assets/img/skills/Git.webp" },
    { title: "GitHub", icon: "/assets/img/skills/Github.webp" },
  ],
  tools: [
    { title: "Visual Studio Code", icon: "/assets/img/skills/VSC.webp" },
    { title: "Figma", icon: "/assets/img/skills/Figma.svg" },
    { title: "Adobe Photoshop", icon: "/assets/img/skills/css.webp" },
    { title: "DaVinci Resolve", icon: "/assets/img/skills/js.webp" },
  ],
  Design: [
    { title: "Blender", icon: "/assets/img/skills/Blenders.webp" },
    { title: "WordPress", icon: "/assets/img/skills/wordpress.webp" },
    { title: "Shopify", icon: "/assets/img/skills/Shopify.png" },
    { title: "OBS Studio", icon: "/assets/img/skills/js.webp" },
    { title: "Audacity", icon: "/assets/img/skills/Audacity.webp" },
  ]
};

const Skills = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState('coding');

  return (
    <section className="skills-section">
      <div className="skills-container">
        <h2 className="skills-title">My Skills</h2>
        
        <div className="category-tabs">
          {Object.keys(skillsData).map((category) => (
            <button
              key={category}
              className={`tab-button ${activeTab === category ? 'active' : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {skillsData[activeTab].map((skill, index) => (
            <div 
              key={index}
              className="skill-item"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              {/* Füge diesen Div hinzu */}
              <div className="gradient-border"></div>
              
              <img
                src={skill.icon}
                alt={skill.title}
                className="skill-icon"
                style={{
                  transform: hoveredIndex === index 
                    ? 'scale(1.15) rotateZ(0deg)' 
                    : 'scale(1) rotateZ(0deg)'
                }}
              />
              <p className="skill-title">{skill.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
