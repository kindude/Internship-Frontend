import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from "./pages/About";
import WelcomePage from "./pages/Welcome";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import UserRegistrationPage from "./pages/UserRegistration";
import UserAuthorizationPage from "./pages/UserAuthorization";
import UsersListPage from "./pages/UsersList";
import UserProfilePage from "./pages/UserProfile";
import CompaniesListPage from "./pages/CompaniesList";
import CompanyProfilePage from "./pages/CompanyProfile";
import NavBar from "./components/layout/Navbar";

import BackendStatus from "./components/layout/BackendStatus";
import { PrivateRoute } from "./types/types";
import UserPage from "./pages/UserPage";
import UserUpdatePage from "./pages/UserUpdate";


const AppRouter: React.FC = () => {

    return (
        <Router>
                <Header />
                <NavBar />
                <Routes>
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/register" element={<UserRegistrationPage />} />
                    <Route path="/auth" element={<UserAuthorizationPage />} />
                    <Route path="/users" element={<PrivateRoute><UsersListPage /></PrivateRoute>} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/companies" element={<PrivateRoute><CompaniesListPage /></PrivateRoute>} />
                    <Route path="/company" element={<CompanyProfilePage />} />
                    <Route path="/api/health" element={<BackendStatus />} />
                    <Route path="/userPage/:userId" element={<UserPage/>} />
                    <Route path="/users/update/:userId" element={<UserUpdatePage/>} />
                    <Route path="/companyPage/:companyId" element={<CompanyProfilePage/>} />
                </Routes>
                <Footer />
              
        </Router>

    );
};

export default AppRouter;
