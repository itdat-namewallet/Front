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
import "../../assets/css/pages/admin/detailInfo.css"
import { useLocation } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DetailInfo = () => {
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
    

    // 수정 모달 오픈 상태 변수 및 함수들
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(()=>{
        const fetchSelectedUserDetail = async () => {
            try{
                const response = await axios.get(`${BASE_URL}/admin/detail-info`,
                    {
                        params: { reportedUserId }
                    }
                );
                setUserData(response.data);
            }catch (error) {
                console.log("데이터를 가져오는 중에 오류 발생: ", error);
            }
        };
        if (reportedUserId) {
            fetchSelectedUserDetail();
        }
    },[reportedUserId])

    // 클릭시 수정사항을 백으로 보내는 함수
    const updateReportedInfo = async (id) => {
        try{
            const response = await axios.post(`${BASE_URL}/admin/reported-info-update`,
            {status, startDateAt, endDateAt, id}
        );
        if(response.data =! null){
            alert("업데이트 성공")
        }else {
            alert(response.data)
        }
        closeModal();
        }catch(error){
            console.log(error);
        }
    }

    const deleteRepotedInfo = async (id) => {
        try{
            const response = await axios.delete(`${BASE_URL}/admin/reported-info-delete`,
                {
                    data: {id},
                    // headers: {Authorization:`Bearer ${localStorage.getItem("jwtToken")}`}
                }
            );
            alert(response.data)
        }catch(error){
            console.log(error);
        }
        
    }

    if(!userData){
        return <div>Loading...</div>;
    }

    return (
        <>
            <table className="detail-info-table">
                <thead >
                    <tr>
                        <td>해당 계정의 고유 번호</td>
                        <td>아이디</td>
                        <td>E-mail</td>
                        <td>회원가입 유형</td> {/* 'GOOGLE','NAVER','KAKAO','MANUAL' */}
                        <td>회원 가입일</td>
                        <td>정보 수정일</td>

                        <td>활동 상태</td> {/* 'ACTIVE','AWAY','BUSY' */}
                        <td>제재 상태</td> {/* 'ACTIVE','BANNED','REPORTED' */}
                        <td>신고 횟수</td>
                        <td>제재 시작일</td>
                        <td>제재 종료일</td>
                        <td>관리자에 의한 정보 수정일</td>
                        <td>수정/삭제</td>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>{userData.user.id}</td>
                        <td>{userData.user.userId}</td>
                        <td>{userData.user.userEmail}</td>
                        <td>{userData.user.providerType}</td>
                        <td>{userData.user.createdAt}</td>
                        <td>{userData.user.updatedAt}</td>

                        <td>{userData.user.userState}</td>
                        <td>{userData.user.status}</td>
                        <td>{userData.cumulativeCount}</td>
                        <td>{userData.startDateAt}</td>
                        <td>{userData.endDateAt}</td>
                        <td>{userData.updateAt}</td>
                        <td>
                            <button onClick={openModal}>수정</button>/
                            <button onClick={()=>deleteRepotedInfo(userData.user.id)}>삭제</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <div>
                    <h2>유저 정보 수정</h2>
                    <label>
                        상태:
                        <input
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            placeholder="제재 상태를 입력하세요"
                        />
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
                    <button onClick={()=>updateReportedInfo(userData.user.id)}>확인</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </ReactModal>
        </>
    )
}
export default DetailInfo;


// import React, { useEffect, useState } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const DetailInfo = () => {

//     const [userList, setUserList] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]); // 검색 및 페이징에 사용할 데이터
//     const [searchTerm, setSearchTerm] = useState(""); // 검색 입력값
//     const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
//     const itemsPerPage = 10; // 페이지당 항목 수



//     useEffect(() => {
//         const bringUserList = async () => {
//             console.log("신고된 유저 목록을 가져오고 있습니다.");
//             alert("신고된 유저 목록을 가져오고 있습니다.");

//             try {
//                 const response = await axios.get(`${BASE_URL}/admin/bring-reported-user-list-detail`);
//                 setUserList(response.data);
//                 setFilteredUsers(response.data); // 초기에는 전체 데이터를 표시
//                 console.log(response.data);

//             } catch (error) {
//                 console.log(error.response.data);
//                 return alert(`${error.response.data}`);
//             }
//         }
//         bringUserList();
//     }, []);

//     // 검색어 변경 시 필터링
//     useEffect(() => {
//         const filtered = userList.filter((user) =>
//             user.reported_user_id.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(filtered);
//         setCurrentPage(1); // 검색 시 페이지를 첫 번째로 초기화
//     }, [searchTerm, userList]);

//     // 현재 페이지에 보여줄 데이터 계산
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//     // 페이지 변경 핸들러
//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     return (
//         <>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="User ID 검색"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>User ID</th>
//                         <th>Cumulative Count</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Update Date</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentUsers.map((user, index) => (
//                         <tr key={index}>
//                             <td>{user.reported_user_id}</td>
//                             <td>{user.cumulative_count}</td>
//                             <td>{user.start_date}</td>
//                             <td>{user.end_date}</td>
//                             <td>{user.status}</td>
//                                 {/* BANNED, REPORTED */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div>
//                 {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => handlePageChange(index + 1)}
//                         style={{
//                             margin: "0 5px",
//                             padding: "5px 10px",
//                             backgroundColor: currentPage === index + 1 ? "lightblue" : "white",
//                         }}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>
//         </>
//     )
// }
// export default DetailInfo;