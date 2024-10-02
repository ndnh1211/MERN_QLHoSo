import './Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/authStore';
const Login = () => {
    const { login } = useAuthStore()
    function isValidEmail(email) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    }
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (email === '') {
            return toast.warning('bạn chưa nhập email')
        } else if (!isValidEmail(email)) {
            return toast.warning("sai định dạng email")
        }
        const res = await login(email, password)
        if (res.success) {
            toast.dismiss()
            toast.success(`Đăng nhập thành công`)
            navigate('/')
        }
        if (res.error) {
            toast.error(res.message)
        }
    }


    return (
        <>
            <div className='login_container'>
                <form className='login_form' onSubmit={handleSubmit}>
                    <h3 className='text-center text-primary'>Login</h3>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder='Enter your Email'
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your Password'
                            className="form-control" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <Link to={'/signup'}>Don't have any account? Signup</Link>
                </form>
            </div>
        </>
    )
}
export default Login;