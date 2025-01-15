import { Link } from "react-router-dom";
import "../../assets/css/common/error.css"


const ErrorPage = () => {

    return (
        <>
            <div className="error-page-main-container">
                <h1>ITDAT</h1>
                <br/>
                <h1>404 Error</h1>
                <h1>유효하지 않은 도메인 주소입니다.</h1>
                <br/>
                <Link to="/">소개 페이지로 이동</Link>
            </div>
        </>
    )
}
export default ErrorPage;