import { useNavigate } from "react-router-dom";

const useTokenErrorHandler = () => {
    const navigate = useNavigate();

    const handleTokenError = (error, mode) => {
        if (mode === "User") {
            if (error.response && (error.response.data.message === 'Token has expired' || error.response.data.message === 'Invalid token')) {
                localStorage.removeItem('Usertoken');
            }
        } else if (mode === "Company") {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('Companytoken');
                navigate('/company/signin');
            }
        } else {
            throw error; // Rethrow if it's another type of error
        }
    };

    return handleTokenError;
};

export default useTokenErrorHandler;
