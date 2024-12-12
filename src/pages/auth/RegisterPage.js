import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/common/Layout";
import "../../assets/css/auth/registerPage.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        userId: "",
        password: "",
        userName: "",
        userEmail: "",
        userPhone: "",
        userType: "PERSONAL",
        company: "",
        companyRank: "",
        companyDept: "",
        companyFax: "",
        companyAddr: "",
        companyPhone: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${BASE_URL}/api/auth/register`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
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
                        <label>아이디:</label>
                        <input type="text" name="userId" onChange={handleChange} required />
                    </div>
                    <div>
                        <label>비밀번호:</label>
                        <input type="password" name="password" onChange={handleChange} required />
                    </div>
                    <div>
                        <label>이름:</label>
                        <input type="text" name="userName" onChange={handleChange} required />
                    </div>
                    <div>
                        <label>이메일:</label>
                        <input type="email" name="userEmail" onChange={handleChange} required />
                    </div>
                    <div>
                        <label>전화번호:</label>
                        <input type="text" name="userPhone" onChange={handleChange} required />
                    </div>
                    <div>
                        <label>유형:</label>
                        <select name="userType" onChange={handleChange}>
                            <option value="BUSINESS">비즈니스</option>
                            <option value="PERSONAL">개인</option>
                        </select>
                    </div>
                    <div>
                        <label>회사명:</label>
                        <input type="text" name="company" onChange={handleChange} />
                    </div>
                    <div>
                        <label>직급:</label>
                        <input type="text" name="companyRank" onChange={handleChange} />
                    </div>
                    <div>
                        <label>부서명:</label>
                        <input type="text" name="companyDept" onChange={handleChange} />
                    </div>
                    <div>
                        <label>팩스 번호:</label>
                        <input type="text" name="companyFax" onChange={handleChange} />
                    </div>
                    <div>
                        <label>회사 주소:</label>
                        <input type="text" name="companyAddr" onChange={handleChange} />
                    </div>
                    <div>
                        <label>회사 전화번호:</label>
                        <input type="text" name="companyPhone" onChange={handleChange} />
                    </div>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </Layout>
    );
}
