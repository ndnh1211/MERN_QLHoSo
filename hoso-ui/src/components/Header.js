import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Logo from '../assets/images/logo.svg'
import './Header.css'
import useAuthStore from "../store/authStore";
const Header = () => {
    const location = useLocation()
    const { logout } = useAuthStore()
    const navigate = useNavigate()
    const handleLogout = async () => {
        const res = await logout()
        if (res.success) {
            navigate('/login')
        }
    }
    return (
        <div className="header_container">
            <div className="header_logo">
                <img src={Logo} alt="Logo" width={48} height={48} />
            </div>
            <ul className="header_link">
                <li><Link to={'/'} className={`link_item ${location.pathname === '/' && 'active'}`}>Home</Link></li>
                <li><Link to={'/account'} className={`link_item ${location.pathname === '/account' && 'active'}`}>Account</Link></li>
                <li><Link to={'/task'} className={`link_item ${location.pathname === '/task' && 'active'}`}>Task</Link></li>
                <li><Link to={'/workflow'} className={`link_item ${location.pathname === '/workflow' && 'active'}`}>Workflow</Link></li>
                <li><Link to={'/department'} className={`link_item ${location.pathname === '/department' && 'active'}`}>Department</Link></li>
            </ul>
            <div className="header_logout" onClick={handleLogout}>
                <FiLogOut />
            </div>
        </div>
    )
}
export default Header;