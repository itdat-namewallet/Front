/*
    --------------------------------------------------------
    작성자 : 서현준
    작성일 : 2024-12-26
    설명   : 신고된 유저 조회하는 컴포넌트 - 간략한 정보 버젼
    ---------------------------------------------------------
*/

import axios from "axios";
import React, { useEffect, useState } from "react";
import { adminStore, userInfoStore } from "../../store";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/pages/qna/qnaPostBoard.module.css";


const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ReportedUser = () => {
    const navigate = useNavigate();

    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 신고 카테고리를 저장
    const [category, setCategory] = useState("");

    // 로그인한 유저의 어드민 권한 확인 전역 변수
    const {isAdmin, loginedUserId} = adminStore();

    // 선택된 유저 정보를 담는 전역 변수. 쥬스탄드
    const { userData, setUserData } = userInfoStore();
    // 선택된 유저 정보를 담는 변수
    const [selectedUserInfo, setSelectedUserInfo] = useState();

    const categoryMap = {
        "BANNED": "제재 중인 계정",
        "REPORTED": "신고된 계정",
        "ACTIVE": "제재 이력이 남은 계정",
        null: "기타",
    };

    useEffect(() => {
        const bringUserList = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/bring-reported-user-list`);
                const sortedData = response.data.sort((a, b) => new Date(b.lastReportedDateAt) - new Date(a.lastReportedDateAt));
                setUserList(sortedData);
                setFilteredUsers(sortedData);
               

            } catch (error) {
                console.log(error.response.data);
            }
        }
        bringUserList();

    }, [])

    // 날짜 형식 변환 함수
    const changeDateType = (date) => {
        if(date != null){
            return new Date(date).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Seoul"
            })
        } else {
            return "제재 중인 유저가 아닙니다."
        }
        
    }

    // 검색 버튼 클릭 시
    const handleSearch = () => {
        const filtered = userList.filter((user) => {
            const matchesCategory = category ? user.user.status == category : true;
            const matchesSearchTerm = user.user.userId
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearchTerm;
        }


        );
        setFilteredUsers(filtered);
        setCurrentPage(1); // 검색 시 페이지를 첫 번째로 초기화
    }

    // 현재 페이지에 보여줄 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const detailInfo = async (reportedUserId) => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/detail-info`,
                {
                    params: { reportedUserId }
                }
            );
            setSelectedUserInfo(response.data);
            setUserData(response.data);
            navigate(`/admin/detail-info?reportedUserId=${reportedUserId}`);
        } catch (error) {
            console.log(error);
        }
        // navigate("/admin/detail-info");
    }


    return (
        <>
            <div className={styles['table-container']}>
                <div className={styles["search-container"]}>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">전체 카테고리</option>
                        <option value="REPORTED">신고된 계정</option>
                        <option value="BANNED">제재 중인 계정</option>
                    </select>
                    <input
                        type="text"
                        placeholder="User ID 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
                <table >
                    <thead>
                        <tr>
                            <th>제재 상태</th>
                            <th>유저 아이디</th>
                            
                            <th>누적 신고 횟수</th>
                            <th>제재 시작일</th>
                            <th>제재 종료일</th>
                            <th>마지막 신고일</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => {
                            const isAccessible = isAdmin;
                            console.log(user);
                            return (
                                <tr
                                    key={index} 
                                    onClick={() => detailInfo(user.user.userId)}
                                    className={`${styles.row} ${isAccessible ? "" : styles.disabledRow}`}
                                >
                                    <td>{ categoryMap[user.user.status] || "알 수 없음" }</td>
                                    <td>{user.user.userId}</td>
                                    
                                    <td>{user.reportedCount}</td>

                                    <td>{changeDateType(user.startDateAt)}</td>
                                    <td>{changeDateType(user.endDateAt)}</td>
                                    <td>{changeDateType(user.lastReportedDateAt)}</td>
                                
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
                <div className={styles['page-pagination']}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        이전
                    </button>
                    {
                        Array.from({ length: totalPages }, (_, index) => index + 1)
                            .filter((page) => {
                                // 현재 페이지 주변 1개와 시작, 끝 3개 유지
                                return (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                );
                            })
                            .map((page, idx, filteredPages) => (
                                <React.Fragment key={page}>
                                    {/* ... 생략 버튼 처리 */}
                                    {idx > 0 && page > filteredPages[idx - 1] + 1 && <span>...</span>}

                                    <button
                                        onClick={() => handlePageChange(page)}
                                        aria-current={currentPage === page ? "page" : undefined}
                                    >
                                        {page}
                                    </button>
                                </React.Fragment>
                            ))
                    }
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        다음
                    </button>
                </div>
            </div>



        </>
    )
}
export default ReportedUser;