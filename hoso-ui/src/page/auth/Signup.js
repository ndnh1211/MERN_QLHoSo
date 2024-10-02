import { useState } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuthStore from '../../store/authStore'


const Signup = () => {
    const { signup, isLoading } = useAuthStore()
    function isValidEmail(email) {
        return true;
    }
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [ngaySinh, setNgaySinh] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (firstName === '') {
            return toast.warning("chưa nhập tên")
        } else if (lastName === '') {
            return toast.warning("chưa nhập họ")
        } else if (email === '') {
            return toast.warning("chưa nhập email")
        } else if (password === '') {
            return toast.warning("chưa nhập mật khẩu")
        } else if (ngaySinh === '') {
            return toast.warning("chưa chọn ngày sinh")
        } else if (phoneNumber === '') {
            return toast.warning("chưa nhập số điện thoại")
        } else if (!isValidEmail(email)) {
            return toast.warning("email sai định dạng ")
        } else if (confirmPassword !== password) {
            return toast.error("mật khẩu không khớp")
        }
        else {
            const res = await signup(firstName, lastName, email, password, ngaySinh, phoneNumber);
            if (res.success) {
                toast.success(res.message)
            }
            if (res.error) {
                console.log('Lỗi');
                toast.error(res.message)
            }
        }
    }

    return (
        <>
            <div className='signup_container'>
                <form className='signup_form' onSubmit={handleSubmit}>
                    <h3 className='text-center text-primary'>Signup</h3>
                    <div className='mb-3 row'>
                        <div className="col-6">
                            <label className="form-label">First Name</label>
                            <input type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="form-control"
                                placeholder='Enter your First Name'
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Last Name</label>
                            <input type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="form-control"
                                placeholder='Enter your Last Name'
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày Sinh</label>
                        <input type="date"
                            value={ngaySinh}
                            onChange={(e) => setNgaySinh(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Số Điện Thoại</label>
                        <input type="number"
                            maxLength={10}
                            value={phoneNumber}
                            onChange={(e) => { setPhoneNumber(e.target.value) }}
                            className="form-control"
                        />
                    </div>
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
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Enter your Confirm Password'
                            className="form-control" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {
                                isLoading ? 'Loading...' : 'Sign Up'
                            }
                        </button>
                    </div>
                    <Link to={'/login'}>Have already been account? Login</Link>
                </form>
            </div>
        </>
    )
}
export default Signup;