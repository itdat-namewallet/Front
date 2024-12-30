/*
    --------------------------------------------------------
    작성자 : 서현준
    작성일 : 2024-12-26
    설명   : 신고된 유저 조회하는 컴포넌트 - 간략한 정보 버젼
    ---------------------------------------------------------
*/

import axios from "axios";
import { useEffect, useState } from "react";


const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ReportedUser = () => {

    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const bringUserList = async () => {
            console.log("신고된 유저 목록을 가져오고 있습니다.");
            alert("신고된 유저 목록을 가져오고 있습니다.");

            try {
                const response = await axios.get(`${BASE_URL}/admin/bring-reported-user-list`);
                setUserList(response.data);
                setFilteredUsers(response.data); // 초기에는 전체 데이터를 표시
                console.log(response.data);

            } catch (error) {
                console.log(error.response.data);
                return alert(`${error.response.data}`);
            }
        }
        bringUserList();

    }, [])

    // // 검색어 변경 시 필터링
    // useEffect(() => {
    //     const filtered = userList.filter((user) =>
    //         user.reported_user_id.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setFilteredUsers(filtered);
    //     setCurrentPage(1); // 검색 시 페이지를 첫 번째로 초기화
    // }, [searchTerm, userList]);

    // 현재 페이지에 보여줄 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="User ID 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>제재 대상이 되는 유저의 ID</th>
                        <th>누적 신고 횟수</th>
                        <th>제재 시작일</th>
                        <th>제재 종료일</th>
                        <th>최근 제재 업데이트 일</th>
                        <th>제재 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.user.userId}</td>
                            <td>{user.cumulativeCount}</td>
                            <td>{user.startDateAt}</td>
                            <td>{user.endDateAt}</td>
                            <td>{user.updateAt}</td>
                            <td>{user.user.status}</td>
                            
                            
                            {/* <td>{user.cumulative_count}</td>
                            <td>{user.start_date}</td>
                            <td>{user.end_date}</td>
                            <td>{user.status}</td> */}
                                {/* BANNED, REPORTED */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            margin: "0 5px",
                            padding: "5px 10px",
                            backgroundColor: currentPage === index + 1 ? "lightblue" : "white",
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    )
}
export default ReportedUser;