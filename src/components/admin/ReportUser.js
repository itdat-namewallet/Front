import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ReportUser = () => {
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

    // 단순 테스트용
    const reportTest = async () => {
        const response = await axios.post(`${BASE_URL}/admin/report-user-list`,
            { reportedUserId: "asd", description: "너 신고!", userId: "신고자", reportDateAt: new Date() }
        );
    }
    // reportTest();

    // 신고 목록 가져오기
    useEffect(()=>{

        const bringReportList = async () => {
            try{
                const response = await axios.get(`${BASE_URL}/admin/report-user-list`);
                setReportUserList(response.data);
                setFilteredList(response.data);
            }catch(error){
                console.log(error.response.data);
                return alert(`${error.response.data}`);
            }
        }
        bringReportList();
        

    }, [])

    // 클릭시 input 창의 검색어를 이용하여 특정 문자열을 포함한 객체를 배열로 담아내는 함수
    const handleSearch = () => {
        const filtered = reportUserList.filter((one) =>
            one.reportedUserId.toLowerCase().inCludes(searchTerm.toLowerCase())
            // toLowerCase(): 대소문자 구분 없이 검색 가능하도록 소문자로 변환시켜준다.
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



    return (
        <>
            <div>
                {/* 검색 기능 */}
                <input
                    type="text"
                    placeholder="USER ID 검색"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            <table>
                <thead>
                    {/* 리스트의 헤드 */}
                    <tr> 
                        <th>신고당한 유저 아이디</th>
                        <th>신고 이유</th>
                        <th>신고한 유저 아이디</th>
                        <th>신고한 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 리스트의 바디 */}
                    {currentUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.reportedUserId}</td>
                            <td>{user.description}</td>
                            <td>{user.userId}</td>
                            <td>{user.reportDateAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* 페이징 처리 버튼 */}
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    style={{
                        margin: "0 5px",
                        padding: "5px 10px",
                    }}
                >
                    이전
                </button>
                {Array.from({length: totalPages}, (_, index) => {
                    
                    <button
                        key={index}
                        onClick={()=>handlePageChange(index+1)}
                        style={{
                            margin: "0 5px",
                            padding: "5px 10px",
                            backgroundColor: currentPage === index + 1 ? "lightblue" : "white",
                        }}
                    >
                        {index+1}
                    </button>
                    
                })}
                <button
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    style={{
                        margin: "0 5px",
                        padding: "5px 10px",
                    }}
                >
                    다음
                </button>
            </div>
            
        </>
    )
}
export default ReportUser;