import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import "../../assets/css/pages/main/qnaPage/textEditor.css"

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TextEditor = () => {
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(''); // 카테고리 상태

    // CKEditor 변경 이벤트 핸들러
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
        console.log('Content:', data);
    };

    // 카테고리 변경 이벤트 핸들러
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    // 확인 버튼 클릭 시 데이터 전송
    const handleSubmit = async () => {
        if (!category) {
            alert("카테고리를 선택해 주세요.");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/qna/write`, { content, category });
            console.log('서버 응답:', response.data);
            alert('성공적으로 저장되었습니다!');
        } catch (error) {
            console.error('데이터 전송 오류:', error);
            alert('저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
        <div className='text-container'>
            {/* 카테고리 선택 */}
            <div className='text-container-top' style={{ marginTop: '20px' }}>
                <label htmlFor="category" style={{ marginRight: '10px' }}>글 분류:</label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    style={{ padding: '5px' }}
                >
                    {/* <option value="">카테고리 선택</option> */}
                    <option value="" disabled selected>카테고리 선택</option>
                    <option value="명함제작">명함제작</option>
                    <option value="신고">신고</option>
                    <option value="기타">기타</option>
                </select>
            </div>

            <div className="text-editor-body">
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        placeholder: "내용을 입력하세요.",
                    }}
                    onChange={handleEditorChange}
                />
            </div>

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





// import React, { useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Link, Outlet } from 'react-router-dom';
// import axios from 'axios';
// import "../../assets/css/pages/main/qnaPage/textEditor.css"

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const TextEditor = () => {
//     const [content, setContent] = useState('');

//     // CKEditor 변경 이벤트 핸들러
//     const handleEditorChange = (event, editor) => {
//         const data = editor.getData();
//         setContent(data);
//         console.log('Content:', data);
//     };

//     // 확인 버튼 클릭 시 데이터 전송
//     const handleSubmit = async () => {
//         try {
//             const response = await axios.post(`${BASE_URL}/qna/write`, { content });
//             console.log('서버 응답:', response.data);
//             alert('성공적으로 저장되었습니다!');
//         } catch (error) {
//             console.error('데이터 전송 오류:', error);
//             alert('저장 중 오류가 발생했습니다.');
//         }
//     };
    
//     return (
//         <>
//             <div className='text-editor-body'>
//                 <CKEditor
//                     editor={ClassicEditor}
//                     config={{
//                         placeholder: "내용을 입력하세요.",
//                     }}
//                     onChange={handleEditorChange}
//                 />
//             </div>

//             <div style={{ marginTop: '20px' }}>
//                 <button onClick={handleSubmit} style={{ padding: '10px 20px', cursor: 'pointer' }}>
//                     확인
//                 </button>
//             </div>
//         </>

//     )
// }
// export default TextEditor;