import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminStore } from "../../store";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const QnaPostUpdate = () => {
    const navigate = useNavigate();

    const location = useLocation(); // 현재 URL 정보 가져오기
    const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터 파싱
    const selectedId = queryParams.get("postId"); // "postId" 값 가져오기

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const { loginedUserId } = adminStore();
    const [id, setId] =useState("");
    // const [createDateAt, setCreateDateAt] = useState("");
    // const [updateAt, setUpdateAt] = useState("");
    const [isSecret, setIsSecret] = useState(false);
    const [checkSecret, setCheckSecret] = useState(false);
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");


    useEffect(() => {
        const bringSelectedPost = async () => {
            const response = await axios.get(`${BASE_URL}/qna/selected-qna`,
                { params: { selectedId } }
            )
            console.log(response.data);
            const thePost = response.data;
            setCategory(thePost.category);
            setTitle(thePost.title);
            setContents(thePost.contents);
            setCheckSecret(thePost.secret);
            setId(thePost.id);

            // 비밀글 여부를 setIsSecret(thePost.secret); 로 받고, 
            // 만약 초기 상태가 비밀글이면 체크를 풀어 비밀글을 해제할 때
            // 비밀번호 확인 로직을 추가하여 백으로 요청을 보내 비밀번호를 해제시켜둔다.
            // 이후 비밀글 설정을 다시 한다면 새로운 비밀 번
            // setIsSecret(thePost.secret);
            // setPassword(thePost.password);

        }
        bringSelectedPost();
    }, [])

    // CKEditor 변경 이벤트 핸들러
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContents(data);
        // setUser(loginedUserId);
        // console.log('Contents:', data);
    };

    // 카테고리 변경 이벤트 핸들러
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    // 제목 변경 이벤트 핸들러
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

        // 비밀 여부 변경 이벤트 핸들러 - 확인용
        const checkSecretChange = async (event) => {
            try{
                const response = await axios.post(`${BASE_URL}/qna/check-password`,
                    {checkPassword, id}
                )
                if(response.data === true){
                    // setCheckSecret(event.target.checked);
                    // console.log(event.target.checked);
                    // if (!event.target.checked) setCheckPassword(""); // 비밀글 해제 시 패스워드 초기화
                    setCheckSecret(false);
                    setCheckPassword("");
                }else{
                    alert("비밀번호가 일치하지 않습니다.")
                }
            }catch(error){
                console.log("서버와의 통신 중에 오류 발생: ",error);
            }
        };
        console.log(isSecret);
    
        // 패스워드 변경 이벤트 핸들러 - 확인용
        const checkPasswordChange = (event) => {
            setCheckPassword(event.target.value);
        };

        // // 비밀 번호 확인 버튼 - 확인용
        // const checkPasswordButton = async () => {
            
        // }

    // 비밀 여부 변경 이벤트 핸들러
    const handleIsSecretChange = (event) => {
        setIsSecret(event.target.checked);
        console.log(event.target.checked);
        if (!event.target.checked) setPassword(""); // 비밀글 해제 시 패스워드 초기화
    };

    // 패스워드 변경 이벤트 핸들러
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // 확인 버튼 클릭 시 데이터 전송
    const handleSubmit = async () => {
        if (!category) {
            alert("카테고리를 선택해 주세요.");
            return;
        }

        if (isSecret && !password.trim()) {
            alert("비밀글 비밀번호를 입력해 주세요.");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/qna/update`, {
                title,
                contents,
                category,
                isSecret,
                password,
                loginedUserId,
            });
            console.log('서버 응답:', response.data);
            //alert('성공적으로 저장되었습니다!');
            // 작성자의 아이디를 백으로 요청을 보내서 작성자의 마지막 글을 받아낸다.
            navigate(`/qna`);
        } catch (error) {
            console.error('데이터 전송 오류:', error);
            //alert('저장 중 오류가 발생했습니다.');
        }
    };


    return (

        <>
            <div className='text-container'>
                {/* 카테고리 선택 */}
                <div className='text-container-top' style={{ marginTop: '20px' }}>
                    {/* <label htmlFor="category" style={{ marginRight: '10px' }}>글 분류:</label> */}
                    <select
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                        style={{ padding: '10px' }}
                    >
                        <option value="" disabled selected>카테고리 선택</option>
                        <option value="MERCHANDISE">명함제작</option>
                        <option value="NFC">NFC</option>
                        <option value="APP">어플리케이션</option>
                        <option value="ACCOUNT">계정관련</option>
                        <option value="ETC">기타</option>
                    </select>
                </div>

                {/* 제목 입력 */}
                <div className='text-container-top' style={{ marginBottom: '20px' }}>
                    {/* <label htmlFor="title" style={{ marginRight: '10px' }}>제목:</label> */}
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="제목을 입력하세요."
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* CKEditor */}
                <div className="text-editor-body" style={{ marginBottom: '20px' }}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={contents}
                        config={{
                            placeholder: "권리침해, 욕설, 비하, 명예훼손, 혐오, 불법촬영물 등의 내용을 게시하면 운영정책 및 관련 법률에 의해 제재될 수 있습니다. 본인이 쓴 게시글 및 댓글에 대한 법적 책임은 본인에게 있습니다.",

                        }}
                        onChange={handleEditorChange}
                    />
                </div>

                {/* 비밀 여부 및 패스워드 */}
                {
                    checkSecret ?
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginRight: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={checkSecret}
                                    onChange={checkSecretChange}
                                />
                                비밀글
                            </label>
                            {checkSecret && (
                                <input
                                    type="password"
                                    value={checkPassword}
                                    onChange={checkPasswordChange}
                                    placeholder="설정했던 비밀번호를 입력하세요."
                                    style={{ padding: '10px', marginLeft: '10px' }}
                                />

                            )}
                            {/* {checkSecret && (
                                <button onClick={checkPasswordButton}>비밀번호 확인</button>
                            )} */}
                        </div>
                        :
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginRight: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={isSecret}
                                    onChange={handleIsSecretChange}
                                />
                                비밀글
                            </label>
                            {isSecret && (
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="비밀번호를 입력하세요."
                                    style={{ padding: '10px', marginLeft: '10px' }}
                                />

                            )}
                        </div>
                }


                {/* 확인 버튼 */}
                <div style={{ marginTop: '20px' }}>
                    <button onClick={handleSubmit} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        확인
                    </button>
                </div>
            </div>
        </>
    )
}
export default QnaPostUpdate;