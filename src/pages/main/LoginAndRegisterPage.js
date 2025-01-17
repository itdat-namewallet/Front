// import logo from '../../assets/images/anchor.webp';
// import loginImage from '../../assets/images/Designer Working.png';
// import registerButton from '../../assets/images/regidter-button.png'
// import loginButton from '../../assets/images/login-button.png'

// import '../../assets/css/pages/main/loginAndRegisterPage.css'
// import { useNavigate } from "react-router-dom";

// export default function LoginAndRegisterPage() {
//     const navigate = useNavigate();

//     const moveToRegister =()=>{
//         navigate("/register");
//     }
//     const meveToLogin =()=>{
//         navigate("/login");
//     }

//     return (

//         <>
//             <div className="login-page-main-container">
//                 <div className="left-container">
//                     <div className="text-container">
//                         <h1>사람과</h1>
//                         <h1>사람을 잇다</h1>
//                     </div>
//                     <div className="text-and-logo-container">
//                         <h1>ITDAT</h1>
//                         <img className="logo-image" src={logo} alt="이미지 로고" />
//                     </div>
//                     <div className="size-box"></div>
//                     <p>여기서 새롭게 이어가세요.</p>
//                 </div>
//                 <div className="right-container">
//                     <img className="login-image" src={loginImage} alt="로그인 페이지 메인 이미지"/>
//                     <div className="button-container">
//                         <button className="register-button" onClick={moveToRegister}>
//                             <img src={registerButton}/>
//                         </button>
//                         <button className="login-button" onClick={meveToLogin}>
//                             <img src={loginButton}/>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>

//         // <div className="login-page">
//         //     <h1>로그인</h1>
//         //     <div className="form-group">
//         //         <label>이메일</label>
//         //         <input
//         //             type="email"
//         //             value={email}
//         //             onChange={(e) => setEmail(e.target.value)}
//         //             placeholder="이메일 입력"
//         //         />
//         //     </div>
//         //     <div className="form-group">
//         //         <label>비밀번호</label>
//         //         <input
//         //             type="password"
//         //             value={password}
//         //             onChange={(e) => setPassword(e.target.value)}
//         //             placeholder="비밀번호 입력"
//         //         />
//         //     </div>
//         //     <button onClick={handleLogin}>로그인</button>
//         // </div>
//     );
// }
