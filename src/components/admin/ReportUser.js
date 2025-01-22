import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminStore, userInfoStore } from "../../store";
import styles from "../../assets/css/pages/qna/qnaPostBoard.module.css";
import ReactModal from "react-modal";


const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ReportUser = () => {
    const navigate = useNavigate();

    // 신고된 신고 리스트를 담는 변수
    const [reportUserList, setReportUserList] = useState([]);
    // 필터링된 리스트
    const [filteredList, setFilteredList] = useState([]);
    // 검색한 값을 담는 변수
    const [searchTerm, setSearchTerm] = useState("");
    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 항목 수
    const itemsPerPage = 10;
    // 선택된 유저 정보를 담는 전역 변수. 쥬스탄드
    const { userData, setUserData } = userInfoStore();
    // 신고 카테고리를 저장
    const [category, setCategory] = useState("");

    const [modalData, setModalData] = useState(null); // 모달 데이터 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태


    // 선택된 유저 정보를 담는 변수
    // const [selectedUserInfo, setSelectedUserInfo] = useState();
    // 로그인한 유저의 어드민 권한 확인 전역 변수
    const {isAdmin, loginedUserId} = adminStore();

    const categoryMap = {
        "POSTING_PORNOGRAPHY": "부적절한 게시물",
        "FAKE_ACCOUNT": "허위 계정",
        "FALSE_ADVERTISING": "허위 광고",
        "HYPE": "과대 광고",
        "ETC": "기타",
        null: "기타",
    };

    // 신고 목록 가져오기
    useEffect(() => {

        const bringReportList = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/report-user-list`);
                const sortedData = response.data.sort((a, b) => new Date(b.reportDateAt) - new Date(a.reportDateAt));
                setReportUserList(sortedData);
                setFilteredList(sortedData);
                // setReportUserList(response.data);
                // setFilteredList(response.data);
            } catch (error) {
                console.log(error.response.data);
            }
        }
        bringReportList();


    }, [])

    // 클릭시 input 창의 검색어를 이용하여 특정 문자열을 포함한 객체를 배열로 담아내는 함수
    const handleSearch = () => {

        const filtered = reportUserList.filter((one) => {
            // 카테고리가 빈 값이면 ETC로 간주
            const normalizedCategory = one.category === null ? "ETC" : one.category;

            const matchesCategory = category ? normalizedCategory == category : true;
            const matchesSearchTerm = one.reportedUserId
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearchTerm;
        }
            // toLowerCase(): 대소문자 구분 없이 검색 가능하도록 소문자로 변환시켜준다.
            // includes(): 해당 문자열이 ()안의 문자를 포함하는지 여부를 true, false 가려준다.
        );
        setFilteredList(filtered);
        setCurrentPage(1); // 검색이 이뤄지면 리스트의 첫 페이지로 이동되도록 한다.
    };

    // 동적으로 페이지에 보여줄 데이터를 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    // 현재 페이지(배열) 안에서의 마지막 객체 인덱스 번호를 특정하기 위한 변수
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // 마지막 객체 인덱스 변수에 페이지 당 보여줄 객체의 항목 수를 셈하여, 페이지 배열 안에서의 첫 번째 객체 인덱스 특정
    const currentUsers = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    // 현재 페이지에 보여질 객체들을 인덱스 번호로 구간을 특정 짓는 변수 
    // slice(start, end): start는 인덱스에 포함 되고, end는 포함되지 않는다.
    // slice(0,10)이면 0~9까지 즉, 10개의 객체가 담긴다.
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);
    // 리스트의 총 항목 수에 페이지당 보여줄 객체의 항목 수를 셈하여, 적절한 페이지 수를 구한다.
    // Math.ceil(): 소수점을 올림하여 마지막 페이지까지 구현한다.
    // Math.ceil(25/10)이면 2.5이므로 3페이지까지 구현하여 객체들을 모두 조회할 수 있도록 한다.

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowClick = (user) => {
        setModalData(user); // 클릭한 행의 데이터를 모달 상태에 저장
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null); // 모달 데이터 초기화
    };

    const handleDetailClick = () => {
        if (modalData) {
            detailInfo(modalData.reportedUserId); // 모달 데이터의 유저 ID로 상세보기 실행
        }
    };

    const detailInfo = async (reportedUserId) => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/detail-info`,
                {
                    params: { reportedUserId }
                }
            );
            // setSelectedUserInfo(response.data);
            setUserData(response.data);
            navigate(`/admin/detail-info?reportedUserId=${reportedUserId}`);
        } catch (error) {
            console.log(error);
        }
        // navigate("/admin/detail-info");
    }

    return (
        <div className={styles["table-container"]}>
            <>
                <div className={styles["search-container"]}>
                    {/* 신고 카테고리 선택창 */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">전체 카테고리</option>
                        <option value="POSTING_PORNOGRAPHY">부적절한 게시물</option>
                        <option value="FAKE_ACCOUNT">허위 계정</option>
                        <option value="FALSE_ADVERTISING">허위 광고</option>
                        <option value="HYPE">과대 광고</option>
                        <option value="ETC">기타</option>
                    </select>
                    <input
                        type="text"
                        placeholder="User ID 검색"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
                <table>
                    <thead>
                        {/* 리스트의 헤드 */}
                        <tr>
                            <th>신고 카테고리</th>
                            <th>유저 아이디</th>
                            {/* <th>신고 이유</th> */}
                            
                            
                            <th>신고 날짜</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 리스트의 바디 */}
                        {currentUsers.map((user, index) => {
                            const isAccessible = isAdmin;
                            return (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(user)}
                                    className={`${styles.row} ${isAccessible ? "" : styles.disabledRow}`}
                                >
                                    <td>{categoryMap[user.category] || "알 수 없음"}</td> {/* 카테고리 한글 변환 */}
                                    <td>{user.reportedUserId}</td>
                                    
                                    
                                    <td>
                                        {new Date(user.reportDateAt).toLocaleString("ko-KR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td>{user.userId}</td>
                                    
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

                <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="신고 상세 정보"
                    className={styles.modalContent} // 스타일 클래스
                    overlayClassName={styles.modalOverlay} // 오버레이 스타일 클래스
                >
                    {modalData && (
                        <div>
                            <h2>신고 상세 정보</h2>
                            <p><strong>카테고리:</strong> {categoryMap[modalData.category] || "알 수 없음"}</p>
                            <p><strong>유저 아이디:</strong> {modalData.reportedUserId}</p>
                            <p><strong>신고 이유:</strong> {modalData.description}</p>
                            <button onClick={handleDetailClick}>유저 상세보기</button>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    )}
                </ReactModal>
            </>
        </div>
    )
}
export default ReportUser;