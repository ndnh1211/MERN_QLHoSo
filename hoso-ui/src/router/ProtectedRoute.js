import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore"
import Header from "../components/Header";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore()
    if (!isAuthenticated) {
        return <Navigate to={'/login'} replace />
    }
    return <><Header />{children}</>;
}

export default ProtectedRoute