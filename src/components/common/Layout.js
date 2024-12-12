import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import '../../assets/css/common/layout.css';

export default function Layout({ children }) {
    return (
        <div className="layout">
            <Header />
            <main className="content">{children}</main>
            <Footer />
        </div>
    );
}
