'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HamburgerMenu.css';
import Link from 'next/link';

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const navLinksRef = useRef([]);

  useEffect(() => {
    // Initialisiere das Menü und Overlay außerhalb des Bildschirms
    gsap.set(menuRef.current, { x: '-100%' });
    gsap.set(overlayRef.current, { opacity: 0 });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  
    if (!isMenuOpen) {
      // Menü und Overlay anzeigen
      gsap.set(navLinksRef.current, { opacity: 0, y: 20 }); // Setze Startwerte sicherheitshalber
      gsap.to(menuRef.current, {
        duration: 0.8,
        x: 0,
        ease: 'power3.out',
      });
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 1,
        pointerEvents: 'auto',
      });
  
      // Navigationslinks nacheinander anzeigen
      gsap.fromTo(
        navLinksRef.current,
        { opacity: 0, y: 20 }, // Startwerte explizit definieren
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          delay: 0.3,
          duration: 0.5,
          ease: 'power3.out',
        }
      );
    } else {
      // Menü und Overlay ausblenden
      gsap.to(menuRef.current, {
        duration: 0.8,
        x: '-100%',
        ease: 'power3.in',
      });
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 0,
        pointerEvents: 'none',
      });
    }
  };

  const handleLinkClick = () => {
    // Menü schließen, wenn ein Link angeklickt wird
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      {/* Halbtransparentes Overlay */}
      <div ref={overlayRef} className="hamburger-overlay" onClick={toggleMenu}></div>

      <div className="hamburger-menu-container">
        <div className="hamburger-icon" onClick={toggleMenu}>
          <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`} />
          <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`} />
          <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`} />
        </div>
        
        <div ref={menuRef} className="menu">
          <nav>
            <ul>
              <li ref={(el) => (navLinksRef.current[0] = el)}>
                <Link href="/" onClick={handleLinkClick}>Home</Link>
              </li>
              <li ref={(el) => (navLinksRef.current[1] = el)}>
                <Link href="/blog" onClick={handleLinkClick}>Blog</Link>
              </li>
              <li ref={(el) => (navLinksRef.current[2] = el)}>
                <Link href="/portfolio" onClick={handleLinkClick}>Portfolio</Link>
              </li>
              <li ref={(el) => (navLinksRef.current[3] = el)}>
                <Link href="/about" onClick={handleLinkClick}>About</Link>
              </li>
              <li ref={(el) => (navLinksRef.current[4] = el)}>
                <Link href="/guestbook" onClick={handleLinkClick}>Guestbook</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
