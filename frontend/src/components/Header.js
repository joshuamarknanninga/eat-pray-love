// src/components/Header.js

import React from 'react';
import logo from '../assets/images/logo.png';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg'; // SVG as React Component

const Header = () => {
  return (
    <header className="ui menu">
      <div className="header item">
        <img src={logo} alt="Eat-Pray-Love Logo" style={{ height: '50px' }} />
      </div>
      <div className="right menu">
        <a className="item">
          <UserIcon style={{ width: '24px', height: '24px' }} />
          Profile
        </a>
      </div>
    </header>
  );
};

export default Header;
