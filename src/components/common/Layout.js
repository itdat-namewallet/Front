import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../assets/css/common/layout.css";
import { Outlet } from "react-router-dom";
import LeftAside from "./LeftAside";
import RightAside from "./RightAside";
import MyWallet from "../../pages/main/MyWallet";

const Layout = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;

      if (scrollPosition >= documentHeight - 10) {
        setShowFooter(true);
      } else {
        setShowFooter(false); 
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="layout">
      <div className="main-content">
        <Header />
        <LeftAside className="left-aside" />
        <Outlet />
      </div>
      <RightAside className="right-aside" />
      <Footer className={showFooter ? "show-footer" : "hide-footer"} />
    </div>
  );
};

export default Layout;
