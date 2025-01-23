import React, { useEffect, useState } from "react";
import { adminStore, qnaPostDetail } from "../../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/pages/qna/qnaPostBoard.module.css"

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 로그인된 유저의 아이디를 백으로 보내 해당 유저가 작성한 모든 Qna 게시글을 가져온다.
const MyQnaPost = () => {
    const navigate = useNavigate();

    const { isAdmin, loginedUserId } = adminStore();
    
    // const [seleletedList, setSelectedList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const {qnaPostData, setQnaPostData} = qnaPostDetail();


    useEffect(() => {
        const bringListByLoginedUserId = async () => {
            try {
            const response = await axios.get(`${BASE_URL}/qna/bring-list-by-logined-user-id`,
                {
                    params: {
                        currentUserId: loginedUserId,
                    }
                }
            )
                if (typeof response.data === String) {
                    alert(response.data);
                } else if (Array.isArray(response.data)) {
                    const sortedData = response.data.sort((a,b) => new Date(b.createDateAt) - new Date(a.createDateAt));
                    setFilteredList(sortedData);
                } else {
                    console.log("알 수 없는 타입의 data가 넘어왔습니다.");
                }
            } catch (error) {
                console.log(error);
            }
        }
        bringListByLoginedUserId();
    }, [])

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
            {/* <h1> 내 게시글 확인 구성 중..</h1> */}
            <div className={styles[`table-container`]}>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.category}>카테고리</th>
                            <th className={styles.title}>제목</th>
                            {/* <th className={styles.author}>작성자</th> */}
                            <th className={styles.date}>작성일</th>
                            <th className={styles.status}>답변 여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentQnaList.map(
                                (post, index)=> {
                                    // 게시글이 비밀글인지 확인
                                    const isAccessible = isAdmin || post.user.userId === loginedUserId || !post.secret;
                                    return (
                                        <tr 
                                            key={index}
                                            onClick={()=>isAccessible && openQnaPost(post.id)}
                                            className={`${styles.row} ${isAccessible ? "" : styles.disabledRow}`}
                                            // 어드민 여부에 따라 커서와 게시물의 흐림 정도를 다르게 css
                                        >
                                            <td>{post.category}</td>
                                            <td>{post.title}</td>
                                            {/* <td>{post.contents.length > 10 ? `${post.contents.slice(0,10)} ...` : post.contents}</td> */}
                                            {/* <td>{post.user.userId}</td> */}
                                            {/* <td>{post.createDateAt}</td> */}
                                            <td>
                                                {new Date(post.createDateAt).toLocaleString("ko-KR", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    timeZone: "Asia/Seoul"
                                                })}
                                            </td>
                                            <td>{post.answered? "O" : "X"}</td>
                                        </tr>
                                    )
                                }
                                    
                            )
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
export default MyQnaPost;