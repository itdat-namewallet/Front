import React from "react";
import "../../assets/css/pages/main/admin.css"

import { Link, Outlet } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Admin = () => {
    
    return (
        <div className='admin-container'>

            <div className='admin-header'>
                <div className='left-text-header'>
                    <Link to={"/admin"}>
                        <h3>신고된 유저 현황 조회</h3>
                    </Link>
                    <h3>/</h3>
                    <Link to={"/admin/report-user"} >
                        <h3>신고 현황</h3>
                    </Link>
                </div>
                {/* <div className='right-text-header'>
                    <Link to={"/qna/my-qna-post"}>
                        <h3>내 게시글 확인</h3>
                    </Link>
                </div> */}
            </div>

            <Outlet/>

        </div>
    )
}
export default Admin;