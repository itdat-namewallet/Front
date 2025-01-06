import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import "../../assets/css/qna/textEditor.css"
import { adminStore } from '../../store';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TextEditor = () => {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [user, setUser] = useState("");
    const {loginedUserId} = adminStore();
    // setUserId(loginedUserId);
    // const [createDateAt, setCreateDateAt] = useState("");
    // const [updateAt, setUpdateAt] = useState("");
    const [isSecret, setIsSecret] = useState(false);
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState(""); // 카테고리 상태
    

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

    // 비밀 여부 변경 이벤트 핸들러
    const handleIsSecretChange = (event) => {
        setIsSecret(event.target.checked);
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
            const response = await axios.post(`${BASE_URL}/qna/write`, {
                title,
                contents,
                category,
                isSecret,
                password,
                loginedUserId,
             });
            console.log('서버 응답:', response.data);
            //alert('성공적으로 저장되었습니다!');
            //
        } catch (error) {
            console.error('데이터 전송 오류:', error);
            //alert('저장 중 오류가 발생했습니다.');
        }
    };

    //console.log(loginedUserId);

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
                    config={{
                        placeholder: "권리침해, 욕설, 비하, 명예훼손, 혐오, 불법촬영물 등의 내용을 게시하면 운영정책 및 관련 법률에 의해 제재될 수 있습니다. 본인이 쓴 게시글 및 댓글에 대한 법적 책임은 본인에게 있습니다.",
                       
                    }}
                    onChange={handleEditorChange}
                />
            </div>

            {/* 비밀 여부 및 패스워드 */}
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

            {/* 확인 버튼 */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleSubmit} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    확인
                </button>
            </div>
        </div>
            
        </>
    );
};

export default TextEditor;