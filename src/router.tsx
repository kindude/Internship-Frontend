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
import Modal from "./components/modal/Modal";
import CompanyProfilePage from "./pages/CompanyProfile";
import NavBar from "./components/layout/Navbar";
import axiosInstance from "./api/api_instance";
import { servicesVersion } from "typescript";
import { checkBackendHealth } from "./api/api_instance";


const AppRouter: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBackendUp, setIsBackendUp] = useState(true);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Perform health check when the component mounts
        checkBackendHealth();
    }, []);

    

    return (
        <Router>
            <Header />
            <NavBar />
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/register" element={<UserRegistrationPage />} />
                <Route path="/auth" element={<UserAuthorizationPage />} />
                <Route path="/users" element={<UsersListPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/companies" element={<CompaniesListPage />} />
                <Route path="/company" element={<CompanyProfilePage />} />
                <Route
                    path="/api/health"
                    element={
                        isBackendUp ? (
                            <div>
                                <h1>Backend is healthy</h1>
                            </div>
                        ) : (
                            <div>
                                <h1>Backend is not responding</h1>
                            </div>
                        )
                    }
                />
            </Routes>
            <Footer />
            <button onClick={openModal}>Open Modal</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Modal Content</h2>
                <p>This is the content of the modal window.</p>
            </Modal>
        </Router>
    );
};

export default AppRouter;
