import axios from "axios";
import { useNavigate } from "react-router-dom"; 
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?");
        if (!confirmLogout) return;

        try {
            await axios.post(`${BASE_URL}/api/auth/logout`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
            });

            // 토큰 삭제 및 리다이렉트
            localStorage.removeItem("jwtToken");
            navigate("/");
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            로그아웃
        </button>
    );
}
