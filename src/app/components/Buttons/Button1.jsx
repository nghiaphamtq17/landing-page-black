import React from 'react';
import './Button1.css';

const Button1 = ({ className, children, href }) => {
  return (
    <div className={`cta-button-container ${className}`}>
      <a href={href}>
        <button type="button" className="cta-button">
          <svg
            id="Ebene_3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 50"
            width="160"
            height="50"
          >
            <polygon
              className="cls-1"
              points="12.12 .2 0 12.32 0 49.5 187.88 49.5 200 37.38 200 .2 12.12 .2"
            />
            <circle className="cls-2" cx="196.48" cy="3.98" r=".9" />
            <circle className="cls-2" cx="196.48" cy="7.52" r=".9" />
            <circle className="cls-2" cx="193.06" cy="3.98" r=".9" />
            <circle className="cls-2" cx="4.1" cy="45.87" r=".9" />
            <circle className="cls-2" cx="4.1" cy="42.28" r=".9" />
            <text x="100" y="30" className="cta-text">
              {children || 'Click Here'}
            </text>
          </svg>
        </button>
      </a>
    </div>
  );
};

export default Button1;
