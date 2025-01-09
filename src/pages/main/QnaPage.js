import React, { useState } from 'react';

import { Link, Outlet } from 'react-router-dom';

import "../../assets/css/pages/main/qnaPage.css"

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const QnaPage = () => {

    return (
        <div className='qna-container'>

            <div className='qna-header'>
                <div className='left-text-header'>
                    <Link to={"/qna"} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <h3>게시판 조회</h3>
                    </Link>
                    <h3>/</h3>
                    <Link to={"/qna/write"} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <h3>게시판 글쓰기</h3>
                    </Link>
                </div>
                <div className='right-text-header'>
                    <Link to={"/qna/my-qna-post"} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <h3>내 게시글 확인</h3>
                    </Link>
                </div>
            </div>

            <Outlet/>

        </div>
    );
};

export default QnaPage;
