import React from 'react';
import Link from 'next/link';
import styles from './NavLinks.css';

const NavLinks = ({ isDarkMode }) => {
  return (
    <nav className={`nav-links ${isDarkMode ? 'dark-mode' : ''}`}>
      <ul>
        <li>
          <Link href="/" passHref>
            Home
          </Link>
        </li>
        <li>
          <Link href="/blog" passHref>
            Blog
          </Link>
        </li>
        <li>
          <Link href="/portfolio" passHref>
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="/about" passHref>
            About
          </Link>
        </li>
        <li>
          <Link href="/guestbook" passHref>
            Guestbook
          </Link>
        </li>
        <li>
          <Link href="/testing" passHref>
            Testing Page
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
