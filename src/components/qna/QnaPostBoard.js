import axios from "axios";
import { useEffect, useState } from "react";
import { qnaPostDetail } from "../../store";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const QnaPostBoard = () => {
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

    useEffect(() => {
        const bringList = async () => {
            try{
                const response = await axios.get(`${BASE_URL}/qna/all-list`);
                console.log("여기까진 왔어?");
                console.log(response.data);
                if(typeof response.data === "string"){
                    alert(response.data);
                    // 타입 확인하여 스트링이면 내용을 알러트로 띄움
                }else if(Array.isArray(response.data)){
                    setQnaList(response.data);
                    // 타입 확인하여 리스트면 상태 업데이트
                }else {
                    console.error("알수 없는 타입의 데이터가 담겼습니다. ", response.data)
                }
            }catch(error){
                console.log(error);
                alert("error: " + error.message)
                // 서버에러..
            }
        }
        bringList();
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
                const response = await axios.get(`${BASE_URL}/qna/selected-qna-list`, 
                    {params: {selectedId}}
                );
                setQnaPostData(response.data);
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
            <h1>게시판 조회 구성 중..</h1>
            <table>
                <thead>
                    <tr>
                        <td>제목</td>
                        <td>내용</td> {/* 요약된 내용.. 무슨 수로? 문자열 10번째 까지 보여지고 이후 ... 붙이기 */}
                        <td>작성자</td>
                        <td>작성일</td> {/* 수정일을 클릭 후 확인 가능 */}
                        {/* 비밀글은 제목만 보이도록 */}
                        {/* 비밀번호는 클릭시 묻는 용도로 */}
                    </tr>
                </thead>
                <tbody>
                    {
                        currentQnaList.map(
                            (user, index)=>(
                                <tr key={index} onClick={()=>openQnaPost(user.id)}>
                                    <td>{user.title}</td>
                                    <td>{user.contents}</td>
                                    <td>{user.userId}</td>
                                    <td>{user.updateAt}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            <div>
                {
                    Array.from({length: totalPages}, (_, index) => (
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
                    )
                    )
                }
            </div>
        </>
    )
}
export default QnaPostBoard;