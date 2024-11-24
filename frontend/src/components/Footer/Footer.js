// src/components/Footer.js

import React from 'react';
import FacebookIcon from '../../assets/icons/facebook.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';

const Footer = () => {
  return (
      <footer className="footer">
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={FacebookIcon} alt="Facebook" width={24} height={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={TwitterIcon} alt="Twitter" width={24} height={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} alt="Instagram" width={24} height={24} />
          </a>
        </div>
        <p>&copy; 2023 Eat Pray Love. All rights reserved.</p>
      </footer>
    );
  };

export default Footer;
