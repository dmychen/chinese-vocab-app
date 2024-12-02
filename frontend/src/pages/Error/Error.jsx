import { useNavigate } from "react-router-dom";
import "./Error.css";

const Error = ({ error }) => {
    const navigate = useNavigate();

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
        case 404:
            return "404: Page Not Found";
        default:
            return "An unexpected error has occurred.";
        }
    };

    return (
        <div className="error-page-container">
            <h1 className="error-page-title">
                {getErrorMessage(error?.status || 0)}
            </h1>
            <p className="error-page-message">
                {error?.message || "We couldn't find what you were looking for."}
            </p>
            <button className="error-page-button" onClick={() => navigate("/dictionary/search")}>
                Go back to Dictionary
            </button>
        </div>
    );
};

export default Error;
