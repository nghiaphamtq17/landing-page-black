import React from 'react';
import { Github, Linkedin, Dribbble, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-bottom">
          <div className="footer-left">
            <span className="footer-copyright">
              © Gylan Salih
            </span>
            <span className="footer-legal">
              <a href="https://github.com/GylanSalih/NextJS-Portify/tree/main" target="_blank" rel="noopener noreferrer">
                If you like the website, feel free to visit the open-source repository!
              </a>
            </span>
          </div>

          <div className="footer-socials">
            <a href="https://github.com/GylanSalih/" target="_blank" rel="noopener noreferrer">
              <Github className="footer-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="footer-icon" />
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
              <Dribbble className="footer-icon" />
            </a>
            <a href="mailto:hello@portfolio.com">
              <Mail className="footer-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
