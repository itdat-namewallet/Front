// /*
//     --------------------------------------------------------
//     작성자 : 서현준
//     작성일 : 2024-12-26
//     설명   : 신고된 유저 조회하는 컴포넌트 - 상세 정보 버젼
//     ---------------------------------------------------------
// */

import axios from "axios";
import userInfoStore from "../../store";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../assets/css/pages/admin/detailInfo.module.css"
import "../../assets/css/common/reactModal.css"

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DetailInfo = () => {
    const navigate = useNavigate();

    // params에서 넘겨온 값 받아내기
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const reportedUserId = queryParams.get("reportedUserId");
    console.log(reportedUserId);

    // 선택된 유저 데이터가 담긴 전역 변수. 쥬스탄드
    const { userData, setUserData } = userInfoStore();
    // 관리자가 수정할 수 있는 유저의 제재 관련 상태들
    const [status, setStatus] = useState("");
    const [startDateAt, setStartDateAt] = useState("");
    const [endDateAt, setEndDateAt] = useState("");  // const [updateAt, setUpdateAt] = useState(""); // 백에서 처리..
    const [isChange, setIsCange] = useState(true);
    // 원래 값을 저장하기 위한 상태
    const [originalStatus, setOriginalStatus] = useState("");
    const [originalStartDateAt, setOriginalStartDateAt] = useState("");
    const [originalEndDateAt, setOriginalEndDateAt] = useState("");

    // 수정 모달 오픈 상태 변수 및 함수들
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        // 모달을 닫을 때 원래 상태로 복구
        setStatus(originalStatus);
        setStartDateAt(originalStartDateAt);
        setEndDateAt(originalEndDateAt);
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (userData) {
            setStatus(userData.user.status); // 기존 상태값을 모달에 표시
            setStartDateAt(userData.startDateAt); // 기존 시작일을 모달에 표시
            setEndDateAt(userData.endDateAt); // 기존 종료일을 모달에 표시

            // 원래 값을 저장
            setOriginalStatus(userData.user.status);
            setOriginalStartDateAt(userData.startDateAt);
            setOriginalEndDateAt(userData.endDateAt);
        }
    }, [userData]); // userData가 변경될 때마다 호출됨

    useEffect(() => {
        const fetchSelectedUserDetail = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/detail-info`,
                    {
                        params: { reportedUserId }
                    }
                );
                setUserData(response.data);
            } catch (error) {
                console.log("데이터를 가져오는 중에 오류 발생: ", error);
            }
        };
        if (reportedUserId) {
            fetchSelectedUserDetail();
        }
    }, [reportedUserId, isChange])

    // <td>{new Date(userData.startDateAt).toLocaleString("ko-KR",{
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //     hour: "2-digit",
    //     minute: "2-digit",
    // })}</td>

    const changeDateType = (date) => {
        if(date != null){
            return new Date(date).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })
        } else {
            return "제재 중인 유저가 아닙니다."
        }
        
    }

    // 클릭시 수정사항을 백으로 보내는 함수
    const updateReportedInfo = async (id) => {
        try {
            const response = await axios.post(`${BASE_URL}/admin/reported-info-update`,
                { status, startDateAt, endDateAt, id }
            );
            if (response.data = ! null) {
                alert("업데이트 성공")
            } else {
                alert(response.data)
            }
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    const resetState = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/selected-user-reset-state`,
                {
                    params: {
                        id: id
                    }
                }
            );
            if (response.data) {
                setIsCange(!isChange);
                alert("해당 유저의 제재 상태가 초기화 되었습니다.");
            } else {
                alert("해당 유저의 정보 초기화에 실패하였습니다.")
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 삭제 버튼을 제거하여 사용하지 않는다.
    // const deleteRepotedInfo = async (id) => {
    //     try{
    //         const response = await axios.delete(`${BASE_URL}/admin/reported-info-delete`,
    //             {
    //                 data: {id},
    //                 // headers: {Authorization:`Bearer ${localStorage.getItem("jwtToken")}`}
    //             }
    //         );
    //         alert(response.data)
    //         navigate("/admin", {replace: true})
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    const countPlus = async (userId) => {
        console.log(userId);
        try {
            const response = await axios.get(`${BASE_URL}/admin/sanctions-count-up`,
                {
                    params: {
                        userId: userId,
                    }

                }
            )
            console.log(response.data);
            setIsCange(!isChange);
            // alert(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div class={styles['table-container']}>
                <div className={styles["table-box"]}>
                    <side >
                        <tc>
                            {/* <td>해당 계정의 고유 번호</td> */}
                            <td>아이디</td>
                            <td>E-mail</td>
                            <td>회원가입 유형</td> {/* 'GOOGLE','NAVER','KAKAO','MANUAL' */}
                            <td>회원 가입일</td>
                            <td>정보 수정일</td>

                            <td>활동 상태</td> {/* 'ACTIVE','AWAY','BUSY' */}
                            <td>제재 상태</td> {/* 'ACTIVE','BANNED','REPORTED' */}

                            <td>신고 횟수</td>
                            <td>제재 횟수</td>
                            <td>벌점</td>

                            <td>제재 시작일</td>
                            <td>제재 종료일</td>
                            <td>관리자에 의한 정보 수정일</td>
                            <td>수정/초기화/벌점부여</td>

                        </tc>
                    </side>
                    <body>

                        <tc>
                            {/* <td>{userData.user.id}</td> */}
                            <td>{userData.user.userId}</td>
                            <td>{userData.user.userEmail}</td>
                            <td>{userData.user.providerType}</td>
                            <td>{changeDateType(userData.user.createdAt)}</td>
                            <td>{changeDateType(userData.user.updatedAt)}</td>

                            <td>{userData.user.userState}</td>
                            <td>{userData.user.status}</td>

                            <td>
                                {
                                    userData.reportedCount ? userData.reportedCount : "0"
                                }
                            </td>
                            <td>
                                {
                                    userData.bannedCount ? userData.bannedCount : "0"
                                }
                            </td>
                            <td>
                                {
                                    userData.demerit ? userData.demerit : "0"
                                }

                            </td>

                            {/* <td>{userData.startDateAt}</td> */}
                            <td>{changeDateType(userData.startDateAt)}</td>
                            <td>{changeDateType(userData.endDateAt)}</td>
                            <td>{changeDateType(userData.updateAt)}</td>
                            <td>
                                <button onClick={openModal}>직접 수정</button>
                                <button onClick={() => resetState(userData.user.id)}>초기화</button>
                                {/* <button onClick={()=>deleteRepotedInfo(userData.user.id)}>삭제</button> */}
                                <button onClick={() => countPlus(userData.user.id)}>벌점({`${userData.demerit}`})+1</button>
                            </td>

                        </tc>
                    </body>
                </div>
            </div>

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <div>
                    <h2>유저 제재 정보 수정</h2>
                    <label>
                        제재 상태:
                        <select
                            // id="category"
                            value={status}
                            onChange={(e => setStatus(e.target.value))}
                        // style={{ padding: '10px' }}
                        >
                            <option value="" disabled selected>제재 여부 결정</option>
                            <option value="ACTIVE">정상 계정</option>
                            <option value="REPORTED">신고 중인 계정</option>
                            <option value="BANNED">사용 불가 계정</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        시작일:
                        <input
                            type="datetime-local"
                            value={startDateAt}
                            onChange={(e) => setStartDateAt(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        종료일:
                        <input
                            type="datetime-local"
                            value={endDateAt}
                            onChange={(e) => setEndDateAt(e.target.value)}
                        />
                    </label>
                    <br />
                    <button onClick={() => updateReportedInfo(userData.user.id)}>확인</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </ReactModal>
        </>
    )
}
export default DetailInfo;