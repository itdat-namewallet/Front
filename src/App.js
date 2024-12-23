import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import OAuthCallback from "./pages/auth/OAuthCallback";
import LoginPage from "./pages/auth/LoginPage";
import CanvasEditor from "./pages/editor/CanvasEditor";
import EditorPage from "./pages/editor/figma/EditorPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/callback" element={<OAuthCallback />} />
                <Route path="/oauth2/:provider" element={<HomePage />} />
                <Route path="/editor" element={<EditorPage/>}/>
            </Routes>
        </Router>
    );
}
