// frontend/src/components/Navbar.js
import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <Menu fixed='top' inverted>
        <Container>
            <Menu.Item header as={Link} to='/'>
                Eat-Pray-Love
            </Menu.Item>
            <Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>
            <Menu.Item as={Link} to='/profile'>Profile</Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item>Login</Menu.Item>
                <Menu.Item>Register</Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
);

export default Navbar;
