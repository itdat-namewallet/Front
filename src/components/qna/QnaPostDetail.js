import { adminStore, qnaPostDetail } from "../../store";
import styles from "../../assets/css/pages/qna/qnaPostDetail.module.css"
import DOMPurify from 'dompurify';
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const QnaPostDetail = () => {
    const navigate = useNavigate();

    const location = useLocation(); // 현재 URL 정보 가져오기
    const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터 파싱
    const postId = queryParams.get("postId"); // "postId" 값 가져오기

    const { qnaPostData, setQnaPostData } = qnaPostDetail();
    const { isAdmin, loginedUserId } = adminStore();

    const [qnaAnswerList, setQnaAnswerList] = useState([]);

    const [contents, setContents] = useState("");

    const [isChange, setIsChange] = useState(true);

    useEffect(() => {
        const fetchQnaPost = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/qna/selected-qna`, {
                    params: { selectedId: postId },
                });
                if(typeof response.data === "string"){
                    alert(response.data);
                }else if(Array.isArray(response.data)){
                    setQnaPostData(response.data);
                }
            } catch (error) {
                console.log("데이터를 가져오는 중에 오류 발생: ", error);
            }
        };

        if (postId) {
            fetchQnaPost();
        }
    }, [postId]);

    useEffect(() => {
        const fetchQnaAnswerList = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/qna/selected-qna-answer-list`, {
                    params: {selectedId: postId}
                });
                if(typeof response.data === "string"){
                    alert(response.data);
                }else if(Array.isArray(response.data)){
                    setQnaAnswerList(response.data);
                }
            } catch (error) {
                console.log("데이터를 가져오는 중에 오류 발생: ", error);
            }
        };
        if (postId) {
            fetchQnaAnswerList();
        }
    }, [postId, isChange])

    // 선택된 게시물 수정
    const updatePost = async () => {
        // 게시물의 수정 권한은 ADMIN과 작성자 그리고 게시물의 비밀번호를 알고 있는 자만이 가능하다.
        try {
            const response = await axios.get(`${BASE_URL}/qna/check-permission-to-edit`,
                {
                    params: {
                        postId: postId,
                        currentUserId: loginedUserId
                    },
                }
            )
            if (response.data) {
                navigate(`/qna/post-update?postId=${postId}`);
            } else {
                alert("게시물의 수정은 해당 게시물의 작성자만 가능합니다.")
            }
        }catch (error) {
            console.log("수정 권한을 확인하는 중 오류 발생: ", error);
        }
        
    }

    // 선택된 게시물 삭제
    const deletePost = async () => {
        try {
            const response = await axios.delete(`${BASE_URL}/qna/selected-delete`,
                {
                    params: {
                        selectedId: postId,
                        userId: loginedUserId
                    },
                }
            )
            if (response.data) {
                alert("게시물의 삭제가 정상적으로 이루어졌습니다.")
                navigate("/qna", {replace: true});
            } else {
                alert("게시물의 삭제는 해당 게시물의 작성자만 가능합니다.")
            }
        } catch (error) {
            console.log("삭제하는 중 오류 발생: ", error);
        }
    }
    if (!qnaPostData) {
        return <div>Loading...</div>; // 데이터가 로딩 중일 때 표시할 내용
    }

    // 선택된 답변 삭제
    const deleteAnswer = async (id) => {
        try{
            const response = await axios.delete(`${BASE_URL}/qna/answer-delete`,
                {
                    params: {
                        selectedId: id
                    }
                }
            )
            if (response.data){
                alert("답변이 삭제되었습니다.")
            }
            setIsChange(!isChange);
        } catch (error) {
            console.log("삭제하는 중 오류 발생: ", error);
        }
    }

    // 관리자가 답변하는 버튼
    const reportAnswer = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/qna/answer-write`, {
                contents,
                loginedUserId,
                postId
            });
            if(response.data){
                alert("답변을 성공적으로 달았습니다.")
                setContents("");
                setIsChange(!isChange);
            }else{
                throw (error) => {
                    console.error('데이터 전송 오류: ', error);
                    alert('저장 중 오류가 발생했습니다.');
                }
            }
        }catch (error) {
            console.error('데이터 전송 오류: ', error);
            alert('저장 중 오류가 발생했습니다.');
        }
    }

    // 답변 변경 이벤트 핸들러
    const handleContentsChange = (event) => {
        setContents(event.target.value);
    }

    // 날짜 형식 변경 함수
    const changeDateType = (localDateTime) => {
        return (
            // new Date(new Date(localDateTime).getTime() +9*60*60*1000).toLocaleDateString("ko-KR", {
            new Date(localDateTime).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Seoul",
        }))
    }

    return (
        <div className={styles.container}>
            {/* 제목 */}
            <h1 className={styles.title}>{qnaPostData.title || "제목 없음"}</h1>

            {/* 작성자 정보 */}
            <div className={styles.meta}>
                <div>
                    작성자: <strong>{qnaPostData.user.userId || "알 수 없음"}</strong>
                </div>
                <div>
                    <div>
                        작성일: {changeDateType(qnaPostData.createDateAt)}
                    </div>
                    {/* 수정일 정보 */}
                    {/* <div className={styles.dateInfo}> */}
                    <div>
                        수정일: {changeDateType(qnaPostData.updateAt)}
                    </div>
                </div>
                
            </div>

            

            {/* 본문 내용 */}
            <div
                className={styles.contents}
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(qnaPostData.contents) || "내용이 없습니다."
                }}
            ></div>

            {/* 수정/삭제 버튼 */}
            <div className={styles.buttons}>
                <button onClick={() => updatePost(qnaPostData.id)}>수정</button>
                <button
                    className={styles.delete}
                    onClick={() => deletePost(qnaPostData.id)}
                >
                    삭제
                </button>
            </div>
            
            {/* 관리자에게만 보이는 답변을 다는 태그들.. */}
            {     
                isAdmin
                ?
                <div className={styles["answer-input-and-button-box"]}>
                    <textarea 
                        type="text"
                        value={contents}
                        onChange={handleContentsChange}
                        placeholder="답변 내용을 입력하세요."
                    />
                    <div className={styles.buttons}>
                        <button onClick={reportAnswer} >
                            답변 작성
                        </button>
                    </div>
                </div>
                : <></>
            }

            {/* 답변 내용, 작성자, 작성일 */}
            <div className={styles["answer-container"]}>
                {
                    qnaAnswerList.map((answer, index) => {
                        return (
                            <div className={styles["out-line"]} key={index}>
                                {/* 왼쪽 위 콘텐츠 */}
                                <div className={styles["contents"]}>
                                    <pre>{answer.contents}</pre>
                                </div>
                                
                                {/* 오른쪽 아래 메타데이터 */}
                                <div className={styles["metadata-container"]}>
                                    <div>관리자 ID: {answer.user.userId}</div>
                                    <div>{changeDateType(answer.createDateAt)}</div>
                                    {isAdmin? <button onClick={()=>deleteAnswer(answer.id)}>삭제</button> : <></>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>  
        </div>
    )
}
export default QnaPostDetail;