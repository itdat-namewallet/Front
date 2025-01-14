import React, { useEffect, useState } from "react";
import "../../assets/css/pages/main/admin.css"

import logoGreenDot from "../../assets/images/logo-green-dot.png";

import { Link, Outlet, useLocation } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Admin = () => {
    const location = useLocation(); // 현재 경로 정보를 가져옴
    const currentPath = location.pathname; // 현재 URL의 경로
    const [activeIndex, setActiveIndex] = useState(null); // 현재 활성화된 li의 index를 저장

    useEffect(() => {
        const currentPath = location.pathname; // 현재 URL의 경로
        if (currentPath.includes("/report-user")) {
            setActiveIndex(1)
        }else if(currentPath.includes("/")){
            setActiveIndex(0)
        }
    }, [currentPath, location]);



    const handleClick = (index) => {
        setActiveIndex(index); // 클릭한 li의 index를 저장
    };
    
    return (
        <div className='admin-container'>

            <div className='admin-header'>
                <div className='left-text-header'>
                    <div className={activeIndex === 0 ? "active":""} onClick={()=>{handleClick(0)}}>
                        <Link to={"/admin"} className='admin-link'>
                            <h3>신고된 유저 현황 조회</h3>
                        </Link>
                        <span className="admin-header-icon">
                            <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                        </span>
                    </div>
                    
                    <h3 className="admin-header-separator">/</h3>
                    
                    <div className={activeIndex === 1 ? "active":""} onClick={()=>{handleClick(1)}}>
                        <Link to={"/admin/report-user"} className='admin-link'>
                            <h3>신고 현황</h3>
                        </Link>
                        <span className="admin-header-icon">
                            <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                        </span>
                    </div>
                    
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