import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import axios from "axios";
import * as path from 'path';
import '../styles/aboutPage.css';


const AboutPage: React.FC = () =>{
    return(
        
        <div className="container">
            <h1>About Page</h1>
            <p>This is project is written in React using typescript</p>

        </div>
    );
};

export default AboutPage;