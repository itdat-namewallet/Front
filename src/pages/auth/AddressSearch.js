import React from "react";

/*
    --------------------------------------------------------
    작성자 : 김동규
    작성일 : 2024-12-13
    설명   : 주소 검색 관련 컴포넌트
    ---------------------------------------------------------
*/

export default function AddressSearch({ address, setAddress }) {
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const fullAddress = data.address;
                setAddress(fullAddress);
            },
        }).open();
    };

    return (
        <div>
            <label>회사 주소</label>
            <div className="address-container">
                <input
                    type="text"
                    value={address}
                    readOnly
                    placeholder="주소를 검색하세요"
                />
                <button type="button" onClick={openAddressSearch}>
                    검색
                </button>
            </div>
        </div>
    );
}
