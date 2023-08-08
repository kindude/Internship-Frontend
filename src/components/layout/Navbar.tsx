import React from "react";
import { Link } from 'react-router-dom';

import '../../styles/navbar.css';
import Button from "./Button";
import LogoutButton from "./LogoutButton";

const NavBar: React.FC = () => {
    return (
        <nav className="navbar-container">
            <ul className="navbar-list">

                <li>
                    <Link to="/">Welcome</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/companies">Companies</Link>
                </li>
                <li>
                    <Link to="/auth">Log In</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>

                <li>
                    <LogoutButton className="navbar-button" text="Logout" type="submit"/>
                </li>
            </ul>



        </nav>
    );
};

export default NavBar;
