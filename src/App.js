import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/main/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import Layout from "./components/common/Layout";
import LoginAndRegisterPage from "./pages/main/LoginAndRegisterPage";
import EditorPage from "./pages/editor/figma/EditorPage";
import QnaPage from "./pages/main/QnaPage";
import QnaPostBoard from "./components/qna/QnaPostBoard";
import TextEditor from "./components/qna/TextEditor";
import MyQnaPost from "./components/qna/MyQnaPost";
import Admin from "./pages/main/Admin";
import OAuthCallback from "./pages/auth/Backup/OAuthCallback";
import { createGlobalStyle } from "styled-components";
import { AuthProvider } from "./context/AuthContext";
import DetailInfo from "./components/admin/DetailInfo";
import BriefInfo from "./components/admin/BriefInfo";

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1443" height="844" viewBox="0 0 1443 844"><path fill-rule="evenodd" fill="rgb(247, 249, 252)" d="M-0.000,-0.001 L1443.000,-0.001 L1443.000,843.998 C1443.000,843.998 1182.549,415.099 862.000,337.999 C273.478,196.444 177.479,168.493 -0.000,-0.001 Z"/></svg>');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
`;

export default function App() {
    return (
        <>
            <GlobalStyle />
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="login-and-register" element={<LoginAndRegisterPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/callback" element={<OAuthCallback />} />
                            <Route path="/oauth2/:provider" element={<HomePage />} />
                            <Route path="/editor" element={<EditorPage />} />
                            <Route path="/qna" element={<QnaPage />}>
                                <Route index element={<QnaPostBoard />} />
                                <Route path="write" element={<TextEditor />} />
                                <Route path="my-qna-post" element={<MyQnaPost />} />
                            </Route>
                            <Route path="admin" element={<Admin/>}>
                                <Route index element={<BriefInfo/>}/>
                                <Route path="brief-info" element={<DetailInfo/>}/>
                            </Route>
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    );
}
