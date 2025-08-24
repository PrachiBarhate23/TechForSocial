import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Projects from "./pages/projectspage";
import ProjectsPage from "./pages/projectspage";
import About from "./pages/landingpage";
import Publications from "./pages/landingpage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import PublicationsPage from "./pages/publications";
import LoginTestPage from "./pages/logintestpage";
import AdminLoginTestPage from "./pages/AdminLoginTestpage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<LandingPage />} />

        {/* Projects page */}
        <Route path="/projects" element={<Projects />} />
         <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/projectspage" element={<ProjectsPage />} />
       <Route path="/AboutUs" element={<AboutUs/>} />
       <Route path="/landingpage" element={<Publications />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/SignUp" element={<SignUp />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/logintestpage" element={<LoginTestPage />} />
        <Route path="/AdminLoginTestpage" element={<AdminLoginTestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
