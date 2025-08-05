'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Mouse from './components/Mouse/Mouse';
import Preload from './components/Preload/Preload';
import './fonts/fonts.css';
import './styles/globals.css';

export default function Layout({ children, enablePreloader = false }) {
  const [isDarkMode, setIsDarkMode] = useState(false); // Initialize with false

  const [isAppLoaded, setIsAppLoaded] = useState(false);

  // Initial setup for Dark Mode (only in the client)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      const darkMode = savedMode ? savedMode === 'true' : true; // Default to true (dark mode)
      setIsDarkMode(darkMode);

      // Apply dark mode class to the root element
      if (darkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newState = !prev;

      // Store the updated dark mode value in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', newState.toString());
        // Add or remove the dark-mode class from the root element
        if (newState) {
          document.documentElement.classList.add('dark-mode');
        } else {
          document.documentElement.classList.remove('dark-mode');
        }
      }
      return newState;
    });
  };

  // Handle Preloader logic
  useEffect(() => {
    if (enablePreloader) {
      setTimeout(() => setIsAppLoaded(true), 5000);
    } else {
      setIsAppLoaded(true); // Directly set app as loaded if no preloader
    }
  }, [enablePreloader]);

  return (
    <html lang="de">
      <body className={isDarkMode ? 'dark-mode' : ''}>
        {/* Show preloader if enabled and app is not loaded */}
        {enablePreloader && <Preload enablePreloader={enablePreloader} />}
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <Mouse />


        <main>{children}</main>


        <Footer />
      </body>
    </html>
  );
}
