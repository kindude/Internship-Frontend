import React from "react";
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/about">About</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users">Users</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/about">About</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/register">Registration</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/auth">Log in</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/profile">User's profile</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/company">Company's profile</Link>
                </li>

            </ul>
        </nav>
    );
};

export default NavBar;
