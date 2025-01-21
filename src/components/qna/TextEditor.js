import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import "../../assets/css/pages/qna/textEditor.css"
import styles from "../../assets/css/pages/qna/textEditor.module.css"
import { adminStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const BASE_URL = process.env.REACT_APP_API_BASE_URL;

class MyCustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload = () => {
        return this.loader.file
            .then(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        // Base64로 로컬 미리보기
                        const base64 = reader.result;
                        resolve({
                            default: base64, // Base64로 로컬 미리보기
                        });
                    };
                    reader.onerror = () => {
                        reject('이미지 업로드에 실패했습니다');
                    };

                    reader.readAsDataURL(file); // Base64로 변환

                    // // 2. 서버로 이미지 업로드
                    // const formData = new FormData();
                    // formData.append('file', file); // 파일을 FormData에 추가
                    //     // 이미지가 등록되는 순간 해당 이미지는 db에 저장된다.
                    //     // 저장된 이미지의 url이 게시물의 contents에 태그 형식으로 저장된다.
                    //     // 만약 이대로 게시물이 저장되면 이미 db에 저장된 이미지는 그대로 db에 남기고
                    //     // 게시물에서 이미지가 빠지면 해당 이미지의 url 주소를 요청에 담아 백을 통해 db에서 삭제한다.

                    // axios.post(`${BASE_URL}/qna/image-upload`, formData)
                    //     .then(response => response.json())
                    //     .then(data => {
                    //         // 서버에서 이미지 URL을 받아옴
                    //         const imageUrl = data.url;
                    //         resolve({
                    //             default: imageUrl, // 서버 URL을 통해 이미지 표시
                    //         });
                    //     })
                    //     .catch(err => {
                    //         reject('이미지 업로드에 실패했습니다');
                    //     });
                });
            });
    }

    abort = () => {
        console.log("업로드가 취소되었습니다.");
    }
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyCustomUploadAdapter(loader);
    };
}

const TextEditor = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [user, setUser] = useState("");
    const {loginedUserId} = adminStore();
    const [isSecret, setIsSecret] = useState(false);
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState(""); 
    

    // CKEditor 변경 이벤트 핸들러
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContents(data);
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
            navigate(`/qna`);
        } catch (error) {
            console.error('데이터 전송 오류: ', error);
            alert('저장 중 오류가 발생했습니다.');
        }
    };

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
                        extraPlugins: [MyCustomUploadAdapterPlugin], // CustomUploadAdapter 추가
                        toolbar: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            'link',
                            'bulletedList',
                            'numberedList',
                            'blockQuote',
                            // 'imageUpload',
                            'undo',
                            'redo',
                        ],
                    }}
                    onChange={handleEditorChange}
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