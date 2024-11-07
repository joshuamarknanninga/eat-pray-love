// src/components/Footer.js

import React from 'react';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as TwitterIcon } from '../assets/icons/twitter.svg';
import { ReactComponent as InstagramIcon } from '../assets/icons/instagram.svg';

const Footer = () => {
  return (
    <footer className="ui inverted vertical footer segment">
      <div className="ui container">
        <div className="ui stackable inverted divided grid">
          <div className="three wide column">
            <h4 className="ui inverted header">Connect</h4>
            <div className="ui inverted link list">
              <a href="https://facebook.com" className="item">
                <FacebookIcon style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                Facebook
              </a>
              <a href="https://twitter.com" className="item">
                <TwitterIcon style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                Twitter
              </a>
              <a href="https://instagram.com" className="item">
                <InstagramIcon style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
