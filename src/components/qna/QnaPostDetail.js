import { qnaPostDetail } from "../../store";
import styles from "../../assets/css/pages/qna/qnaPostDetail.module.css"
    // className 충돌 방지를 위해. 모듈화하여 사용. test 코드임.
import DOMPurify from 'dompurify';
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const QnaPostDetail = () => {
    const location = useLocation(); // 현재 URL 정보 가져오기
    const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터 파싱
    const postId = queryParams.get("postId"); // "postId" 값 가져오기

    const { qnaPostData, setQnaPostData } = qnaPostDetail();

    useEffect(() => {
        const fetchQnaPost = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/qna/selected-qna-list`, {
                    params: { selectedId: postId },
                });
                setQnaPostData(response.data);
            } catch (error) {
                console.log("데이터를 가져오는 중에 오류가 발생: ", error);
            }
        };

        if (postId) {
            fetchQnaPost(); // postId로 데이터 가져오기
        }
    }, [postId]);

    const updatePost = async () => {
        console.log(qnaPostData);
        const response = await axios.post(`${BASE_URL}/qna/update`,
            {

            }
        )
    }
    if (!qnaPostData) {
        return <div>Loading...</div>; // 데이터가 로딩 중일 때 표시할 내용
    }

    return (
        <>
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
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(qnaPostData.contents) || "내용이 없습니다."
                    }}
                >
                </div>
            </div>
            <button onClick={()=>updatePost(qnaPostData.id)}>수정</button>
        </>
    )
}
export default QnaPostDetail;