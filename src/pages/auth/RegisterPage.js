import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
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

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // 소셜 회원가입 데이터 (state에서 가져오기)
    const socialData = location.state || {};

    const provider = searchParams.get("providerType");
    const providerId = searchParams.get("providerId");
    const email = searchParams.get("email");
    const [isVerified, setIsVerified] = useState(false);

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
        companyAddrDetail: "",
        companyPhone: "",
        providerType: provider || "", // 소셜 타입 기본값 설정
        providerId: providerId || "", // 소셜 providerId 기본값 설정
    });

    const [errors, setErrors] = useState({});
    const isSocialRegister = Boolean(socialData.provider);
    // const [isVerified, setIsVerified] = useState(false);     이메일 인증 관련 로직

    // useEffect(() => {
    //     if (isSocialRegister) {
    //         setFormData((prev) => ({
    //             ...prev,
    //             userId: socialData.email || "",
    //             userEmail: socialData.email || "",
    //             password: "",
    //             confirmPassword: "",
    //             providerType: socialData.provider || "",
    //         }));
    //     }
    // }, [socialData]);

    useEffect(() => {
        if (provider && providerId && email) {
            setFormData((prev) => ({
                ...prev,
                userId: email,
                userEmail: email,
                providerType: provider,
                providerId: providerId,
            }));
        } else if (socialData.provider) {
            setFormData((prev) => ({
                ...prev,
                userId: socialData.email || "",
                userEmail: socialData.email || "",
                providerType: socialData.provider || "",
            }));
        }
    }, [provider, providerId, email, socialData.provider, socialData.email]);
    
    

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

            case "companyPhone":
                if (!value || !/^\d{10,11}$/.test(value)) {
                    error = "올바른 전화번호를 입력해 주세요. 10~11자리 숫자만 입력 가능합니다.";
                }
                break;

            case "userBirth":
                if (!value) error = "생년월일을 입력해 주세요.";
                break;

            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const checkAvailability = async (type, value) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/auth/check-availability`, {
                params: { type, value },
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data.available;
        } catch (error) {
            console.error("중복검사 API 호출 오류:", error);
            console.log(`${BASE_URL}`);
            return false;
        }
    };
    
    const handleBlur = async (e) => {
        const { name, value } = e.target;
        if (name === "userId") {
            const isAvailable = await checkAvailability("userId", value);
            setErrors((prev) => ({
                ...prev,
                userId: isAvailable ? "" : "이미 사용 중인 아이디입니다.",
            }));
        } else if (name === "userEmail") {
            const isAvailable = await checkAvailability("userEmail", value);
            setErrors((prev) => ({
                ...prev,
                userEmail: isAvailable ? "" : "이미 사용 중인 이메일입니다.",
            }));
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isVerified) {
            return;
          }
    
        const requiredFields = isSocialRegister
            ? [
                "userId",
                "userName",
                "userEmail",
                "userPhone",
                "userBirth",
              ]
            : [
                "userId",
                "userName",
                "userEmail",
                "userPhone",
                "userBirth",
                "password",
                "confirmPassword",
              ];
    
        const missingFields = requiredFields.filter((field) => !formData[field]);
    
        if (missingFields.length > 0) {
            console.log("Missing Fields:", missingFields);
            const updatedErrors = {};
            missingFields.forEach((field) => {
                updatedErrors[field] = "이 필드는 필수 입력 항목입니다.";
            });
            setErrors((prev) => ({ ...prev, ...updatedErrors }));
            alert("필수 입력 항목을 모두 입력해 주세요.");
            return;
        }
    
        // 비밀번호 확인 검증 (소셜 회원가입이 아닌 경우)
        if (!isSocialRegister && formData.password !== formData.confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "비밀번호가 일치하지 않습니다.",
            }));
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
    
        console.log("Form Data:", formData);
    
        // 서버로 회원가입 요청 전송
        const payload = { ...formData, role: "USER", };
        if (!isSocialRegister) {
            delete payload.providerType;
            delete payload.providerId;
        }

        try {
            const endpoint = isSocialRegister
                ? "/api/oauth/social/register"
                : "/api/auth/register";
            const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            alert("회원가입 성공!");
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "회원가입 실패");
        }
    };
    


    return (
        <div className="register-page">
            <h1>{provider ? `${provider} 회원가입` : "회원가입"}</h1>
            <form onSubmit={handleSubmit}>
                {/* 아이디 입력 (소셜 회원가입일 경우 비활성화) */}
                <FormInput
                    label="아이디"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    error={errors.userId}
                    onBlur={handleBlur} // 중복 체크 실행
                    placeholder="아이디를 입력하세요"
                    disabled={false} // 수정 가능
                />

                {/* 비밀번호 입력 (소셜 회원가입일 경우 비활성화) */}
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
                

                {/* 이름 입력 */}
                <FormInput
                    label="이름"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    error={errors.userName}
                    placeholder="이름"
                />

                {/* 이메일 입력 (소셜 회원가입일 경우 비활성화) */}
                {/* <FormInput
                    label="이메일"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    error={errors.userEmail}
                    disabled={isSocialRegister}
                /> */}

                {/* 이메일 인증 서비스 추후 다시 개발 */}
                <EmailVerification
                    email={formData.userEmail}
                    setEmail={(value) => setFormData((prev) => ({ ...prev, userEmail: value }))}
                    isVerified={isVerified}
                    setIsVerified={setIsVerified}
                    error={errors.userEmail}
                    disabled={isSocialRegister}
                    />

                {/* 유저 타입 드롭다운 */}
                <div className="form-group">
                    <label>유저 타입</label>
                    <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                    >
                        <option value="PERSONAL">개인</option>
                        <option value="BUSINESS">비즈니스</option>
                    </select>
                </div>

                {/* 생년월일 입력 */}
                <FormInput
                    label="생년월일"
                    name="userBirth"
                    type="date"
                    value={formData.userBirth}
                    onChange={handleChange}
                    error={errors.userBirth}
                />

                {/* 전화번호 */}
                <FormInput
                    label="전화번호"
                    name="userPhone"
                    value={formData.userPhone}
                    onChange={handleChange}
                    error={errors.userPhone}
                    placeholder="전화번호"
                />

                {/* 직급 */}
                <FormInput
                    label="직급"
                    name="companyRank"
                    value={formData.companyRank}
                    onChange={handleChange}
                    error={errors.companyRank}
                    placeholder="직급"
                />

                {/* 부서명 */}
                <FormInput
                    label="부서명"
                    name="companyDept"
                    value={formData.companyDept}
                    onChange={handleChange}
                    error={errors.companyDept}
                    placeholder="부서명"
                />

                {/* 회사 전화번호 */}
                <FormInput
                    label="회사 전화번호"
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    error={errors.companyPhone}
                    placeholder="회사 전화번호"
                />

                {/* fax */}
                <FormInput
                    label="fax 번호"
                    name="companyFax"
                    value={formData.companyFax}
                    onChange={handleChange}
                    error={errors.companyFax}
                    placeholder="fax"
                />

                {/* 주소 입력 */}
                <AddressSearch
                    address={formData.companyAddr}
                    setAddress={(value) => setFormData((prev) => ({ ...prev, companyAddr: value }))}
                    detailedAddress={formData.companyAddrDetail}
                    setDetailedAddress={(value) =>
                        setFormData((prev) => ({ ...prev, companyAddrDetail: value }))
                    }
                    company={formData.company}
                    setCompany={(value) => setFormData((prev) => ({ ...prev, company: value }))}
                />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}
