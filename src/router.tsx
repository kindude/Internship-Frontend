import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from "./pages/About";
import WelcomePage from "./pages/Welcome";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import UserRegistrationPage from "./pages/UserRegistration";
import UserAuthorizationPage from "./pages/UserAuthorization";
import UsersListPage from "./pages/UsersList";
import CompaniesListPage from "./pages/CompaniesList";
import CompanyProfilePage from "./pages/CompanyProfile";
import NavBar from "./components/layout/Navbar";
import CompanyUpdatePage from "./pages/CompanyUpdate";
import BackendStatus from "./components/layout/BackendStatus";
import { PrivateRoute } from "./types/types";
import UserPage from "./pages/UserPage";
import UserUpdatePage from "./pages/UserUpdate";
import CompanyMembersPage from "./pages/CompanyMembers";
import CompanyAdminsPage from "./pages/CompanyAdmins";
import QuizzesPage from "./pages/QuizzesPage";
import QuizPage from "./pages/QuizPage";
import QuizCreatePage from "./pages/QuizCreatePage";
import QuizEditPage from "./pages/QuizEditPage";

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
                    <Route path="/companies" element={<PrivateRoute><CompaniesListPage /></PrivateRoute>} />
                    <Route path="/company" element={<CompanyProfilePage />} />
                    <Route path="/api/health" element={<BackendStatus />} />
                    <Route path="/userPage/:userId" element={<UserPage/>} />
                    <Route path="/users/update/:userId" element={<UserUpdatePage/>} />
                    <Route path="/companyPage/:companyId" element={<CompanyProfilePage/>} />
                    <Route path="/companies/update/:companyId" element={<CompanyUpdatePage/>} />
                    <Route path="/company-members/:companyId" element={<CompanyMembersPage/>} />
                    <Route path="/company-admins/:companyId" element={<CompanyAdminsPage/>} />
                    <Route path="/company/:companyId/quizzes" element={<QuizzesPage/>} />
                    <Route path="/company/:companyId/quiz/:quizId" element={<QuizPage/>} />
                    <Route path="/companyPage/:companyId/quizzes/create-quiz" element={<QuizCreatePage/>}/>
                    <Route path="/companyPage/:companyId/quiz/:quizId/update" element={<QuizEditPage/>}/>
                    
                </Routes>
                <Footer />
              
        </Router>

    );
};

export default AppRouter;
