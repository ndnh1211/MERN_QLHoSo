import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore"

const ValidateAccountProvider = ({ children }) => {
    const { account, isAuthenticated } = useAuthStore()
    if (!isAuthenticated && !account) {
        return children;
    } else {
        return <Navigate to={'/'} replace />
    }
}

export default ValidateAccountProvider