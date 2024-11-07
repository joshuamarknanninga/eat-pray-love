// frontend/src/components/Navbar.js (Assuming you have a Navbar component)

import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <Menu inverted>
    <Menu.Item as={Link} to="/">
      Eat-Pray-Love
    </Menu.Item>
    <Menu.Item as={Link} to="/calendar">
      Calendar
    </Menu.Item>
    <Menu.Item as={Link} to="/movies">
      Movies
    </Menu.Item>
    <Menu.Item as={Link} to="/games">
      Games
    </Menu.Item>
    {/* Add other navigation items */}
    <Menu.Menu position="right">
      <Menu.Item>
        <Button as={Link} to="/logout" color="red">
          Logout
        </Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default Navbar;
