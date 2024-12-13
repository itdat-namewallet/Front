import React from "react";

/*
    --------------------------------------------------------
    작성자 : 김동규
    작성일 : 2024-12-13
    설명   : 공통 입력 컴포넌트
    ---------------------------------------------------------
*/

export default function FormInput({ label, name, type = "text", value, onChange, error, placeholder }) {
    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={error ? "register-error" : ""}
                placeholder={placeholder}
            />
            {error && <small className="error-message">{error}</small>}
        </div>
    );
}
