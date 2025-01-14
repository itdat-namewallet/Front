import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import "../../assets/css/pages/qna/textEditor.css"
import styles from "../../assets/css/pages/qna/textEditor.module.css"
import { adminStore } from '../../store';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TextEditor = () => {
    const navigate = useNavigate();

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
        console.log(event.target.checked);
        if (!event.target.checked) setPassword(""); // 비밀글 해제 시 패스워드 초기화
    };
    console.log(isSecret);

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
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa",isSecret);
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
            // 작성자의 아이디를 백으로 요청을 보내서 작성자의 마지막 글을 받아낸다.
            navigate(`/qna`);
        } catch (error) {
            console.error('데이터 전송 오류:', error);
            //alert('저장 중 오류가 발생했습니다.');
        }
    };

    //console.log(loginedUserId);

    return (
        <div className={styles["text-container"]}>
            {/* 카테고리 선택 */}
            <div className={styles["text-container-top"]} style={{ marginTop: "20px" }}>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    style={{ padding: "10px" }}
                >
                    <option value="" disabled selected>
                        카테고리 선택
                    </option>
                    <option value="MERCHANDISE">명함 제작</option>
                    <option value="NFC">NFC</option>
                    <option value="APP">어플리케이션</option>
                    <option value="ACCOUNT">계정 관련</option>
                    <option value="ETC">기타</option>
                </select>
            </div>

            {/* 제목 입력 */}
            <div className={styles["text-container-top"]} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력하세요."
                    style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
                />
            </div>

            {/* CKEditor */}
            <div className={styles["text-editor-body"]} style={{ marginBottom: "25px" }}>
                <CKEditor
                    
                    editor={ClassicEditor}
                    config={{
                        placeholder:
                            "권리침해, 욕설, 비하, 명예훼손, 혐오, 불법촬영물 등의 내용을 게시하면 운영정책 및 관련 법률에 의해 제재될 수 있습니다. 본인이 쓴 게시글 및 댓글에 대한 법적 책임은 본인에게 있습니다."
                        ,
                    }}
                    onChange={handleEditorChange}
                    // onReady={(editor)=>{

                    // }}


                    // onReady={(editor) => {
                    //     console.log('Editor is ready to use!', editor);
      
                    //     // 전체 에디터 크기 설정 (너비와 높이 고정)
                    //     const editorElement = editor.ui.view.element;
                    //     // editorElement.style.width = "1200px";
                    //     editorElement.style.minWidth = '800px'; // 전체 에디터 너비
                    //     editorElement.style.maxWidth = '1200px'; // 전체 에디터 너비
                    //     // editorElement.style.width = "1200px";
                    //     // editorElement.style.width = "";
                    //     // editorElement.style.height = '400px'; // 전체 에디터 높이
                    //     // editorElement.classList.add('custom-editor-container');
      
                    //     // 텍스트 입력 영역 (editable) 크기 설정
                    //     const editableElement = editor.ui.view.editable.element;
                    //     editableElement.style.height = '400px'; // 고정된 높이
                    //     editableElement.style.minHeight = '400px'; // 최소 높이 설정
                    //     editableElement.style.maxHeight = '400px'; // 최대 높이 설정
                    //     editableElement.style.overflowY = 'auto'; // 내용이 넘칠 경우 스크롤이 생기도록 설정
                    //     editableElement.style.resize = 'none'; // 크기 조정 방지
      
                    //     // 포커스가 생겨도 크기 변경을 방지하도록 설정
                    //     editableElement.addEventListener('focus', () => {
                    //         editableElement.style.height = '400px';
                    //         editableElement.style.minHeight = '400px';
                    //         editableElement.style.maxHeight = '400px';
                    //     });
                    //     editableElement.addEventListener('blur', () => {
                    //         setTimeout(() => {
                    //             editableElement.style.height = '400px';
                    //             editableElement.style.minHeight = '400px';
                    //             editableElement.style.maxHeight = '400px';
                    //         }, 0); // setTimeout을 사용하여 스타일을 즉시 적용
                    //     });
                    // }}
      
                />
            </div>

            {/* 비밀 여부 및 패스워드 */}
            <div style={{ marginBottom: "0px", marginTop: "65px"}}>
                <label className={styles["secret-checkbox"]}>
                    <input type="checkbox" checked={isSecret} onChange={handleIsSecretChange} />
                    비밀글
                </label>
                {isSecret && (
                    <input
                        type="password"
                        className={styles["secret-password"]}
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="비밀번호를 입력하세요."
                    />
                )}
            </div>

            {/* 확인 버튼 */}
            <div>
                <button
                    onClick={handleSubmit}
                    className={styles["confirm-button"]}
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default TextEditor;