import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/main/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import OAuthCallback from "./pages/auth/OAuthCallback";
import LoginPage from "./pages/auth/LoginPage";
import Layout from "./components/common/Layout";
import LoginAndRegisterPage from "./pages/main/LoginAndRegisterPage";
import styled, { createGlobalStyle } from 'styled-components'
import EditorPage from "./pages/editor/figma/EditorPage";
// import QnaPage from "./pages/main/QnaPage";

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

export default function App() {
    return (
        <>
            <GlobalStyle/>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>} >
                        <Route index element={<HomePage/>}/>
                        <Route path="login-and-register" element={<LoginAndRegisterPage/>}/>
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/callback" element={<OAuthCallback />} />
                        <Route path="/oauth2/:provider" element={<HomePage />} />
                        <Route path="/editor" element={<EditorPage/>}/>
                        {/* <Route path="/qna" element={<QnaPage/>}/> */}
                    </Route>
                </Routes>
            </Router>
        </>
    );
}
