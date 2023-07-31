import React from "react";
import { Link } from 'react-router-dom';

import '../../styles/navbar.css';

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

            </ul>



        </nav>
    );
};

export default NavBar;
