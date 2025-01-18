// import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// export default class MyCustomUploadAdapter {
//     constructor(loader) {
//         this.loader = loader;
//     }

//     upload() {
//         return new Promise((resolve, reject) => {
//             const data = new FormData();
//             data.append('file', this.loader.file);  // 파일을 FormData로 추가

//             fetch(`${BASE_URL}/qna/image-upload`, {
//                 method: 'POST',
//                 body: data,
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     resolve({
//                         default: data.url,  // 서버에서 반환한 이미지 URL을 CKEditor에 전달
//                     });
//                 })
//                 .catch(err => {
//                     reject('이미지 업로드에 실패했습니다');
//                 });
//         });
//     }

//     abort() {
//         // 업로드 중 취소 처리가 필요하다면 여기에 구현할 수 있습니다.
//     }
// }

// export function MyCustomUploadAdapterPlugin(editor) {
//     editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//         return new MyCustomUploadAdapter(loader);
//     };
// }








// export default class MyUploadAdapter {
//     constructor(loader) {
//         // `loader`는 파일 로딩 상태를 관리하는 CKEditor의 객체입니다.
//         this.loader = loader;
//     }

//     // 업로드 처리
//     upload() {
//         return this.loader.file
//             .then((file) => new Promise((resolve, reject) => {
//                 const formData = new FormData();
//                 formData.append('file', file); // 파일 데이터를 FormData에 추가

//                 // 서버로 업로드 요청
//                 axios
//                     .post(`${BASE_URL}/qna/image-upload`, formData, {
//                         headers: {
//                             'Content-Type': 'multipart/form-data', // FormData 전송을 위한 헤더 설정
//                         },
//                     })
//                     .then((response) => {
//                         // 서버에서 반환된 이미지 URL을 resolve
//                         resolve({
//                             default: response.data.url, // 이미지 URL을 반환
//                         });
//                     })
//                     .catch((error) => {
//                         // 에러 발생 시 reject
//                         reject(error);
//                     });
//             }));
//     }

//     // 업로드 중단 처리 (필요 시 구현 가능)
//     abort() {
//         // 파일 업로드가 중단될 경우에 대한 로직을 추가할 수 있습니다.
//     }
// }

// // CustomUploadAdapter를 에디터에 추가하는 플러그인
// export function MyCustomUploadAdapterPlugin(editor) {
//     editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//         return new MyUploadAdapter(loader);
//     };
// }
