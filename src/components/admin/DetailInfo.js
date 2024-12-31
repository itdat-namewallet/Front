// /*
//     --------------------------------------------------------
//     작성자 : 서현준
//     작성일 : 2024-12-26
//     설명   : 신고된 유저 조회하는 컴포넌트 - 상세 정보 버젼
//     ---------------------------------------------------------
// */

const DetailInfo = () => {
    return (
        <>

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