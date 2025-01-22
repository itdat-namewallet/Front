import axios from "axios";
import React, { useEffect, useState } from "react";
import { adminStore, qnaPostDetail } from "../../store";
import { useNavigate } from "react-router-dom";
// import styles from "../../assets/css/qna/qnaPostBoard.module.css";
import styles from "../../assets/css/pages/qna/qnaPostBoard.module.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const QnaPostBoard = () => {
    const navigate = useNavigate();

    // QnA 게시물의 List를 담는 변수
    const [qnaList, setQnaList] = useState([]);
    // 필터링된 리스트
    const [filteredList, setFilteredList] = useState([]);
    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 항목 수
    const itemsPerPage = 10;
    // 선택된 qna 게시글
    const {qnaPostData, setQnaPostData} = qnaPostDetail();
    // 로그인한 유저의 어드민 권한 확인 전역 변수
    const {isAdmin, loginedUserId} = adminStore();
    // 검색한 값을 담는 변수
    const [searchTerm, setSearchTerm] = useState("");
    // 신고 카테고리를 저장
    const [category, setCategory] = useState("");

    const categoryMap = {
        "MERCHANDISE": "명함 제작",
        "NFC": "NFC",
        "APP": "어플리케이션",
        "ACCOUNT": "계정 관련",
        "ETC": "기타",
        null: "기타",
    };

    useEffect(() => {
        const bringList = async () => {
            try{
                const response = await axios.get(`${BASE_URL}/qna/all-list`);
                if(typeof response.data === "string"){
                    alert(response.data);
                    // 타입 확인하여 스트링이면 내용을 알러트로 띄움
                }else if(Array.isArray(response.data)){
                    const sortedData = response.data.sort((a,b) => new Date(b.createDateAt) - new Date(a.createDateAt));
                    setQnaList(sortedData);
                    setFilteredList(sortedData);
                }else {
                    console.error("알수 없는 타입의 데이터가 담겼습니다. ", response.data)
                }
            }catch(error){
                console.log(error);
                
            }
        }
        bringList();
    }, [])
    
    const handleSearch = () => {

        const filtered = qnaList.filter((one) => {
            // 카테고리가 빈 값이면 ETC로 간주
            const normalizedCategory = one.category === null ? "ETC" : one.category;

            const matchesCategory = category ? normalizedCategory == category : true;
            const matchesSearchTerm = one.title
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
    const currentQnaList = filteredList.slice(indexOfFirstItem, indexOfLastItem);
        // 현재 페이지에 보여질 객체들을 인덱스 번호로 구간을 특정 짓는 변수 
        // slice(start, end): start는 인덱스에 포함 되고, end는 포함되지 않는다.
        // slice(0,10)이면 0~9까지 즉, 10개의 객체가 담긴다.
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);
        // 리스트의 총 항목 수에 페이지당 보여줄 객체의 항목 수를 셈하여, 적절한 페이지 수를 구한다.
        // Math.ceil(): 소수점을 올림하여 마지막 페이지까지 구현한다.
        // Math.ceil(25/10)이면 2.5이므로 3페이지까지 구현하여 객체들을 모두 조회할 수 있도록 한다.

        const openQnaPost = async (selectedId) => {
            try{
                const response = await axios.get(`${BASE_URL}/qna/selected-qna`, 
                    {params: {selectedId}}
                );
                const saveToSessionStorage = (data) => {
                    sessionStorage.setItem("qnaPostData", JSON.stringify(data));
                };
                saveToSessionStorage(response.data);
                setQnaPostData(response.data);


                // 비밀글은 작성자와 관리자만 볼 수 있도록
                // response.data.isSecret이 true면 클릭이 안 되도록

                navigate(`/qna/post-detail?postId=${selectedId}`);
            }catch(error){
                console.log(error);
            }
        }

        // 페이지 변경 핸들러
        const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        };


    return (
        <>
            <div className={styles['table-container']}>
            <div className={styles["search-container"]}>
                    {/* 신고 카테고리 선택창 */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">전체 카테고리</option>
                        <option value="MERCHANDISE">명함 제작</option>
                        <option value="NFC">NFC</option>
                        <option value="APP">어플리케이션</option>
                        <option value="ACCOUNT">계정 관련</option>
                        <option value="ETC">기타</option>
                    </select>
                    <input
                        type="text"
                        placeholder="제목 검색"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.category}>카테고리</th>
                            <th className={styles.title}>제목</th>
                            <th className={styles.author}>작성자</th>
                            <th className={styles.date}>작성일</th>
                            <th className={styles.status}>답변 여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentQnaList.map((post, index) => {
                                const isAccessible = isAdmin || post.user.userId === loginedUserId || !post.secret;

                                return (
                                    <tr
                                        key={index}
                                        onClick={() => isAccessible && openQnaPost(post.id)}
                                        className={`${styles.row} ${isAccessible ? "" : styles.disabledRow}`}
                                    >
                                        <td>{categoryMap[post.category] || "알 수 없음"}</td>
                                        <td>{isAccessible ? post.title : "비밀글입니다." }</td>
                                        <td>
                                            {post.user.userName.length >= 2
                                                ? post.user.userName[0] + "*" + post.user.userName.slice(2)
                                                : post.user.userName}
                                        </td>
                                        <td>
                                            {new Date(post.createDateAt).toLocaleString("ko-KR", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                            }).replace(/\ /g, "")}
                                        </td>
                                        <td>{post.answered? "O" : "X"}</td>
                                    </tr>
                                );
                            })
                        }
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
export default QnaPostBoard;