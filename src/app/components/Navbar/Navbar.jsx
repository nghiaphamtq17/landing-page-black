'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWindowScroll } from 'react-use';
import NavLinks from '../NavLinks/NavLinks';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import gsap from "gsap";
import Logo from '../Logo/Logo'; 
import AudioIndicator from '../AudioIndicator/AudioIndicator';
import styles from './Navbar.css';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  // Zustand für Sticky-Navigation und Scroll-Position
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Zustand für Audio-Indikator (Play/Pause)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll(); // Ermittelt die aktuelle Scroll-Position

  const transparencyThreshold = 10; // Schwellenwert für Transparenz beim Scrollen
  
  // Scroll-Logik, um Navbar bei Scroll zu animieren
  useEffect(() => {
    const handleScroll = () => {
      if (currentScrollY <= transparencyThreshold) {
        gsap.to(navContainerRef.current, {
          y: 0,
          opacity: 1,
          backgroundColor: "transparent", // Navbar wird transparent
          backdropFilter: "blur(0px)", 
          duration: 0.3,
          ease: "power3.inOut",
        });
      } else {
        if (currentScrollY > lastScrollY) {
          gsap.to(navContainerRef.current, {
            y: -80, // Versteckt die Navbar nach unten beim Scrollen
            opacity: 0,
            backdropFilter: "blur(0px)",
            backgroundColor: isDarkMode ? "black" : "white", // Hintergrundfarbe basierend auf Dark Mode
            duration: 0.3, 
            ease: "power2.out",
          });
        } else {
          // Beim hochscrollen wird die Navbar wieder sichtbar
          gsap.to(navContainerRef.current, {
            y: 0, // Zurück zur ursprünglichen Position
            opacity: 1, // Navbar wird sichtbar
            backdropFilter: "blur(0px)",
            backgroundColor: isDarkMode ? "black" : "white", // Hintergrundfarbe für Dark Mode
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      }
  
      setLastScrollY(currentScrollY); // Update der Scroll-Position
    };
  
    handleScroll(); // Initialisiere den Scroll-Effekt

    // Event Listener für Scroll-Ereignisse
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup bei Unmount
    };
  }, [currentScrollY, isDarkMode]); // Der Effekt hängt von der Scroll-Position und Dark Mode ab
  
  // Funktion zum Umschalten des Audio-Indikators (Play/Pause)
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prevState) => !prevState);
  };

  return (
    <header
      ref={navContainerRef}
      className={`navbar 
        ${isSticky ? 'sticky' : ''} 
        ${isSticky && isDarkMode ? 'dark-mode' : ''} 
        ${isSticky && !isDarkMode ? 'light-mode' : ''}
      `}
    >
      <div className="navbar-container">

        <Logo isDarkMode={isDarkMode} />
        <NavLinks isDarkMode={isDarkMode} />
        <HamburgerMenu />
        <DarkModeToggle toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <AudioIndicator isAudioPlaying={isAudioPlaying} toggleAudioIndicator={toggleAudioIndicator} />


      </div>
    </header>
  );
};

export default Navbar;
