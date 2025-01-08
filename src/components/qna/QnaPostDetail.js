import { adminStore, qnaPostDetail } from "../../store";
//import styles from "../../assets/css/qna/qnaPostDetail.module.css"
import styles from "../../assets/css/pages/qna/qnaPostDetail.module.css"
// className 충돌 방지를 위해. 모듈화하여 사용. test 코드임.
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
    // const loginedUserId = queryParams.get("loginedUserId");

    const { qnaPostData, setQnaPostData } = qnaPostDetail();
    const { loginedUserId } = adminStore();


    useEffect(() => {
        const fetchQnaPost = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/qna/selected-qna`, {
                    params: { selectedId: postId },
                });
                setQnaPostData(response.data);
            } catch (error) {
                console.log("데이터를 가져오는 중에 오류 발생: ", error);
            }
        };

        if (postId) {
            fetchQnaPost(); // postId로 데이터 가져오기
        }
    }, [postId]);

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
        console.log(postId);
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

    return (
        <>
            <div>
                <div className={styles.container}>
                    <h1 className={styles.title}>{qnaPostData.title || "제목 없음"}</h1>

                    <div className={styles.meta}>
                        작성자: <strong>{qnaPostData.user.userId || "알 수 없음"}</strong>
                    </div>

                    <div className={styles.dateInfo}>
                        작성일: {qnaPostData.createDateAt || "알 수 없음"} <br />
                        수정일: {qnaPostData.updateAt || "알 수 없음"}
                    </div>

                    <div
                        className={styles.contents}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(qnaPostData.contents) || "내용이 없습니다."
                        }}
                    >
                    </div>
                </div>
                <button onClick={() => updatePost(qnaPostData.id)}>수정</button>
                <button onClick={() => deletePost(qnaPostData.id)}>삭제</button>
            </div>


        </>
    )
}
export default QnaPostDetail;