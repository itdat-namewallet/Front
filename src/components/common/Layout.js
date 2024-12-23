import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import '../../assets/css/common/layout.css';
import { Outlet } from "react-router-dom";
import LeftAside from "./LeftAside";
import RightAside from "./RightAside";


const Layout = () => {
    return (
        <div className="layout">
            
            <div className="main-content">
                <Header />
                <LeftAside className="left-aside"/>
                <Outlet/>            
                <Footer />
            </div>
            <RightAside className="right-aside"/>
        </div>
    );
}
export default Layout;
