import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/common/Layout";
import "../../assets/css/auth/registerPage.css";
import { checkAvailability } from "../../api/auth/AuthApi";

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

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    </div>
                    <div>
                        <label>회사 주소 (선택사항)</label>
                        <input type="text" name="companyAddr" onChange={handleChange} />
                    </div>
                    <div>
                        <label>회사 전화번호 (선택사항)</label>
                        <input type="text" name="companyPhone" onChange={handleChange} />
                    </div>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </Layout>
    );
}
