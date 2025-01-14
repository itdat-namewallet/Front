import React, { useEffect, useState } from 'react';

import { Link, Outlet, useLocation } from 'react-router-dom';

import logoGreenDot from "../../assets/images/logo-green-dot.png";
// import logoGreenDot from "../../assets/images/logo-green-dot.png";

import "../../assets/css/pages/main/qnaPage.css"

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const QnaPage = () => {
    const location = useLocation(); // 현재 경로 정보를 가져옴
    const currentPath = location.pathname; // 현재 URL의 경로
    
    useEffect(() => {
        const currentPath = location.pathname; // 현재 URL의 경로
        if (currentPath.includes("/my-qna-post")) {
            setActiveIndex(2)
        }else if(currentPath.includes("/write")){
            setActiveIndex(1)
        }else if(currentPath.includes("/")){
            setActiveIndex(0)
        }
    }, [currentPath, location]);

    const [activeIndex, setActiveIndex] = useState(null); // 현재 활성화된 li의 index를 저장

    const handleClick = (index) => {
        setActiveIndex(index); // 클릭한 li의 index를 저장
    };

    return (
        <div className='qna-container'>

            <div className='qna-header'>
                <div className='left-text-header'>
                    <div className={activeIndex === 0 ? "active":""} onClick={()=>{handleClick(0)}}>
                        <Link to={"/qna"} className='qna-link' >
                            <h3>게시판 조회</h3>
                        </Link>
                        <span className="qna-header-icon">
                            <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                        </span>
                    </div>

                    <h3 className='qna-header-separator'>/</h3>

                    <div className={activeIndex === 1 ? "active":""} onClick={()=>{handleClick(1)}}>
                        <Link to={"/qna/write"} className='qna-link'>
                            <h3>게시판 글쓰기</h3>
                        </Link>
                        <span className="qna-header-icon">
                            <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                        </span>
                    </div>
                    
                    

                </div>
                <div className='right-text-header'>
                    <div  className={activeIndex === 2 ? "active":""} onClick={()=>{handleClick(2)}}>
                        <Link to={"/qna/my-qna-post"} className='qna-link' >
                            <h3>내 게시글 확인</h3>
                        </Link>
                        <span className="qna-header-icon">
                            <img className="logo-image" src={logoGreenDot} alt="이미지 로고" />
                        </span>
                    </div>
                    
                </div>
            </div>

            <Outlet/>

        </div>
    );
};

export default QnaPage;
