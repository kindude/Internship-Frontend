import React from "react";
import { Link } from 'react-router-dom';

import '../../styles/navbar.css';
import Button from "./Button";
import LogoutButton from "./LogoutButton";
import { useSelector } from 'react-redux';
import { RootState } from "../../types/types";

const NavBar: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    return (
        <nav className="navbar-container">
            <ul className="navbar-list">

                <li>
                    <Link to="/welcome">Welcome</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {currentUser ? (
                    <React.Fragment>

                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/companies">Companies</Link>
                        </li>
                        <li>
                            <Link to={`/userPage/${currentUser.id}`} >My Profile</Link>
                        </li>
                        <li>
                            <LogoutButton className="navbar-button" text="Logout" type="submit" />
                        </li>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <li>
                            <Link to="/auth">Log In</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </React.Fragment>
                )}


            </ul>
        </nav>
    );
};

export default NavBar;
