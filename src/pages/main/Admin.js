import React from "react";

import { Outlet } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Admin = () => {
    
    return (
        <div>
            <h1>관리자 페이지</h1>
            <Outlet/>
        </div>
    )
}
export default Admin;