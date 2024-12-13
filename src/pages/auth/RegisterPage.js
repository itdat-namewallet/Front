import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/auth/registerPage.css";
import EmailVerification from "./EmailVerification";
import AddressSearch from "./AddressSearch";
import FormInput from "./FormInput";

/*
    --------------------------------------------------------
    작성자 : 김동규
    작성일 : 2024-12-13
    설명   : 전체 레이아웃과 폼을 조합하는 최상위 컴포넌트
    ---------------------------------------------------------
*/

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
    const [isVerified, setIsVerified] = useState(false);

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "userEmail":
                if (!value || !/\S+@\S+\.\S+/.test(value)) {
                    error = "올바른 이메일 주소를 입력해 주세요.";
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
                if (!value || !/^\d{11}$/.test(value)) {
                    error = "올바른 전화번호를 입력해 주세요.";
                }
                break;
            
            case "userBirth":
                if (!value) error = "생년월일을 입력해 주세요";
                break;
            
            case "companyFax":
                if (value && !/^\d{3}-\d{3}-\d{4}$/.test(value)) {
                    error = "올바른 FAX번호를 입력해 주세요.";
                }
                break;
            case "companyPhone":
                if (value && !/^\d{1,11}$/.test(value)) {
                    error = "올바른 회사 전화번호를 입력해 주세요.";
                }
                break;
            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isVerified) {
            alert("이메일 인증을 완료해 주세요.");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/register`, formData, {
                headers: { "Content-Type": "application/json" },
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
        <div className="register-page">
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="아이디"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    error={errors.userId}
                    placeholder="아이디"
                />
                <FormInput
                    label="비밀번호"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="비밀번호"
                />
                <FormInput
                    label="비밀번호 확인"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    placeholder="비밀번호 확인"
                />
                <FormInput
                    label="이름"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    error={errors.userName}
                    placeholder="이름"
                />
                <EmailVerification
                    email={formData.userEmail}
                    setEmail={(value) => setFormData((prev) => ({ ...prev, userEmail: value }))}
                    isVerified={isVerified}
                    setIsVerified={setIsVerified}
                />
                <FormInput
                    label="전화번호"
                    name="userPhone"
                    value={formData.userPhone}
                    onChange={handleChange}
                    error={errors.userPhone}
                    placeholder="전화번호"
                />
                <FormInput
                    label="팩스 번호"
                    name="companyFax"
                    value={formData.companyFax}
                    onChange={handleChange}
                    error={errors.companyFax}
                    placeholder="123-456-7890"
                />
                <FormInput
                    label="회사 전화번호"
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    error={errors.companyPhone}
                    placeholder="회사 전화번호"
                />
                <AddressSearch
                    address={formData.companyAddr}
                    setAddress={(value) => setFormData((prev) => ({ ...prev, companyAddr: value }))}
                />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}
