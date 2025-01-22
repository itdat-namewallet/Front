import { Link } from "react-router-dom";
import "../../assets/css/common/error.css"
import logoImg from '../../assets/images/logo-img.png';


const ErrorPage = () => {
    return (
        <>
            <div className="error-page-main-container">
                <Link to="/">
                    <img 
                        src={logoImg} 
                        alt="ITDAT Logo" 
                        className="logo-img" 
                    />
                </Link>
                <br />
                <h1>404 Error</h1>
                <h1>유효하지 않은 도메인 주소입니다.</h1>
                <br />
                <Link to="/" className="link-to-main">
                    소개 페이지로 이동
                </Link>
            </div>
        </>
    );
};
export default ErrorPage;