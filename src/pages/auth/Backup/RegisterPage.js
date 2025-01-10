import React, { useState, useEffect  } from "react";
import axios from "axios";
import Layout from "../../../components/common/Layout";
import "../../../assets/css/auth/registerPage.css";
import { checkAvailability } from "../../../api/auth/AuthApi";

// 2024-12-13 RegisterPage.js 작성자 : 김동규
// 코드의 가독성 및 유지보수성을 높이기 위해 컴포넌트 분리하였음. 

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        userId: "",
        password: "",
        confirmPassword: "",
        userName: "",
        userEmail: "",
        userBirth: "",
        userPhone: "",
        userType: "PERSONAL",
        company: "",
        companyRank: "",
        companyDept: "",
        companyFax: "",
        companyAddr: "",
        companyPhone: "",
    });

    const [errors, setErrors] = useState({});
    const [verificationCode, setVerificationCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [timer, setTimer] = useState(300);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        if (isCodeSent && timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [isCodeSent, timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const validateField = async (name, value) => {
        let error = "";
    
        switch (name) {
            case "userId":
                if (!value) {
                    error = "아이디를 입력해 주세요";
                } else {
                    try {
                        const isAvailable = await checkAvailability("userId", value);
                        console.log(`아이디 ${value} 사용 가능 여부: ${isAvailable}`);
                        if (!isAvailable) error = "이미 사용 중인 아이디입니다.";
                    } catch (err) {
                        console.error("아이디 확인 중 오류:", err);
                        error = "아이디 확인 중 오류가 발생했습니다.";
                    }
                }
                break;
    
            case "userEmail":
                if (!value || !/\S+@\S+\.\S+/.test(value)) {
                    error = "올바른 이메일 주소를 입력해 주세요";
                } else {
                    try {
                        const isAvailable = await checkAvailability("userEmail", value);
                        console.log(`이메일 ${value} 사용 가능 여부: ${isAvailable}`);
                        if (!isAvailable) error = "이미 사용 중인 이메일입니다.";
                    } catch (err) {
                        console.error("이메일 확인 중 오류:", err);
                        error = "이메일 확인 중 오류가 발생했습니다.";
                    }
                }
                break;
    
            case "password":
                if (!value || value.length < 6) error = "비밀번호는 6자리 이상이어야 합니다.";
                break;
    
            case "confirmPassword":
                if (value !== formData.password) error = "비밀번호가 일치하지 않습니다.";
                break;
    
            case "userName":
                if (!value) error = "이름을 입력해 주세요";
                break;
    
            case "userPhone":
                if (!value || !/^\d{11}$/.test(value)) error = "올바른 전화번호를 입력해 주세요.";
                break;
    
            case "userBirth":
                if (!value) error = "생년월일을 입력해 주세요";
                break;

            case "companyFax":
                if (!value || !/^\d{3}-\d{3}-\d{4}$/.test(value)) error = "올바른 팩스 번호를 입력해 주세요.";
                break;

                // 주소 유효성 검사는 선택사항이기 때문에 일단 보류 / 2024-12-13 김동규
            // case "companyAddr":
            //     if (!value) error = "주소를 입력해 주세요";
            //     break;
        
            case "companyPhone":
                if (!value || !/^\d{1,11}$/.test(value)) error = "올바른 회사 전화번호를 입력해 주세요.";
                break;
    
            default:
                break;
        }
    
        setErrors((prev) => ({ ...prev, [name]: error }));
    };
    

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        await validateField(name, value);
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (errors[key]) {
                newErrors[key] = errors[key];
            }
        });

        return Object.keys(newErrors).length === 0;
    };

    const sendVerificationCode = async () => {
        if (!formData.userEmail || errors.userEmail) {
            alert("유효한 이메일을 입력하세요.");
            return;
        }
        try {
            await axios.post(`${BASE_URL}/api/auth/send-verification-code`, {
                email: formData.userEmail,
            });
            setIsCodeSent(true);
            setTimer(300);
            alert("인증번호가 발송되었습니다.");
        } catch (error) {
            console.error("인증번호 발송 오류:", error);
            alert("인증번호 발송에 실패하였습니다.");
        }
    };

    const verifyCode = async () => {
        if (!verificationCode) {
            alert("인증번호를 입력하세요.");
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/verify-code`, {
                email: formData.userEmail,
                code: verificationCode,
            });
            if (response.data.success) {
                setIsVerified(true);
                alert("이메일 인증이 완료되었습니다.");
            } else {
                throw new Error("Invalid code");
            }
        } catch (error) {
            console.error("인증번호 확인 오류:", error);
            setIsVerified(false);
            alert("인증번호가 올바르지 않습니다.");
        }
    };

    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const fullAddress = data.address;
                setFormData((prev) => ({ ...prev, companyAddr: fullAddress }));
            },
        }).open();
    };    
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isVerified) {
            return;
        }
        
        if (!validateForm()) {
            alert("입력한 값에 오류가 있습니다. 확인해 주세요.");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/register`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            alert("회원가입 성공!");
            console.log(response.data);
        } catch (error) {
            alert("회원가입 실패!");
            console.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <Layout>
            <div className="register-page">
                <h1>회원가입</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>아이디</label>
                        <input
                            type="text"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            className={errors.userId ? "register-error" : ""}
                            placeholder={errors.userId || "아이디"}
                        />
                        {errors.userId && <small className="error-message">{errors.userId}</small>}
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? "register-error" : ""}
                            placeholder={errors.password || "비밀번호"}
                        />
                        {errors.password && <small className="error-message">{errors.password}</small>}
                    </div>
                    <div>
                        <label>비밀번호 확인</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? "register-error" : ""}
                            placeholder={errors.confirmPassword || "비밀번호 확인"}
                        />
                        {errors.confirmPassword && <small className="error-message">{errors.confirmPassword}</small>}
                    </div>
                    <div>
                        <label>이름</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className={errors.userName ? "register-error" : ""}
                            placeholder={errors.userName || "이름"}
                        />
                        {errors.userName && <small className="error-message">{errors.userName}</small>}
                    </div>
                    <div>
                        <label>이메일</label>
                        <input
                            type="email"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleChange}
                            className={errors.userEmail ? "register-error" : ""}
                            placeholder={errors.userEmail || "이메일"}
                        />
                        {errors.userEmail && <small className="error-message">{errors.userEmail}</small>}
                    </div>
                    <div>
                        <label>전화번호</label>
                        <input
                            type="text"
                            name="userPhone"
                            value={formData.userPhone}
                            onChange={handleChange}
                            maxLength={11}
                            className={errors.userPhone ? "register-error" : ""}
                            placeholder={errors.userPhone || "전화번호"}
                        />
                        {errors.userPhone && <small className="error-message">{errors.userPhone}</small>}
                    </div>
                    <div>
                        <label>생년월일</label>
                        <input
                            type="date"
                            name="userBirth"
                            value={formData.userBirth}
                            onChange={handleChange}
                            className={errors.userBirth ? "register-error" : ""}
                        />
                        {errors.userBirth && <small className="error-message">{errors.userBirth}</small>}
                    </div>
                    <div>
                        <label>유형</label>
                        <select name="userType" onChange={handleChange}>
                            <option value="BUSINESS">비즈니스</option>
                            <option value="PERSONAL">개인</option>
                        </select>
                    </div>
                    <div>
                        <label>회사명 (선택사항)</label>
                        <input type="text" name="company" onChange={handleChange} />
                    </div>
                    <div>
                        <label>직급 (선택사항)</label>
                        <input type="text" name="companyRank" onChange={handleChange} />
                    </div>
                    <div>
                        <label>부서명 (선택사항)</label>
                        <input type="text" name="companyDept" onChange={handleChange} />
                    </div>
                    <div>
                        <label>팩스 번호 (선택사항)</label>
                        <input type="text" name="companyFax" onChange={handleChange} />
                        {errors.companyFax && <small className="error-message">{errors.companyFax}</small>}
                    </div>
                    <div>
                    <label>회사 주소 (선택사항)</label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                            type="text"
                            name="companyAddr"
                            value={formData.companyAddr}
                            onChange={handleChange} 
                            className={errors.companyAddr ? "register-error" : ""}
                            placeholder="주소를 검색하거나 입력하세요"
                        />
                        <button
                            type="button"
                            onClick={openAddressSearch}
                            className="addr-button"
                        >
                            주소 검색
                        </button>
                    </div>
                    {errors.companyAddr && <small className="error-message">{errors.companyAddr}</small>}
                </div>

                    <div>
                        <label>회사 전화번호 (선택사항)</label>
                        <input type="text" name="companyPhone" onChange={handleChange} />
                        {errors.companyPhone && <small className="error-message">{errors.companyPhone}</small>}
                    </div>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </Layout>
    );
}
