import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import axios from "axios";
import * as path from 'path';
import '../styles/aboutPage.css';





const AboutPage: React.FC = () =>{
    

    const onClick = () => {
        console.log(process.env.REACT_APP_ONE);
    }
    console.log("Domain:", process.env.REACT_APP_DOMAIN);
    console.log("Client ID:", process.env.REACT_APP_CLIENT_ID);

    return(
        
        <div className="container">
            <button onClick={onClick}>Click</button>
            <h1>About Page</h1>
            <p>This is project is written in React using typescript</p>

        </div>
    );
};

export default AboutPage;