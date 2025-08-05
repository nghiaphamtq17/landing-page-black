// Logo.js

import React from 'react';
import Link from 'next/link';
import './Logo.css'; // Instead of 'style from './logo.css''


const Logo = ({ isDarkMode }) => {
  const logo = isDarkMode ? '/assets/img/logo/logo_white.png' : '/assets/img/logo/logo_black.png';

  return (
    <div className="logo">
      <Link href="/" passHref>
        <img
        src={logo}
        alt={isDarkMode ? 'Dark Mode Logo' : 'Light Mode Logo'}
        width={64} 
        height={64}
      />
      </Link>
    </div>
  );
};

export default Logo;

