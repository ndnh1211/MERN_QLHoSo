import { useState } from "react";
import './Home.css'
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";
import useAccountStore from "../store/accountStore";

const Home = () => {
    const { account, verify } = useAuthStore()
    const { updateAccount } = useAccountStore()
    const [firstName, setFirstName] = useState(account?.first_name)
    const [lastName, setLastName] = useState(account?.last_name)
    const [ngaySinh, setNgaySinh] = useState(new Date(account?.ngaySinh).toLocaleDateString('en-CA'))
    const [phoneNumber, setPhoneNumber] = useState(account?.phoneNumber)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if ((firstName === account?.first_name) && (lastName === account?.last_name) && (ngaySinh === account?.ngaySinh) && (phoneNumber === account?.phoneNumber)) {
            return toast.warning('Chưa cập nhật dữ liệu!')
        }
        const res = await updateAccount(account._id, firstName, lastName, ngaySinh, phoneNumber)
        if (res.success) {
            await verify()
            toast.success(res.message)
        }
        if (res.error) {
            toast.error(res.message)
        }
    }
    return (
        <>
            <form className="home-form p-4" onSubmit={handleSubmit}>
                <h3>Profile</h3>
                <div className="row">
                    <div className="form-group col-6">
                        <label> ID </label>
                        <input type="text"
                            value={account?._id}
                            disabled className="form-control" />
                    </div>
                    <div className="form-group col-6">
                        <label> Email </label>
                        <input type="email"
                            value={account?.email}
                            disabled className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <label> First Name </label>
                    <input type="text"
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value) }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label> Last Name </label>
                    <input type="text"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label> Birthday </label>
                    {/* yyyy-dd-MM */}
                    <input type="date"
                        value={ngaySinh}
                        onChange={(e) => { setNgaySinh(e.target.value) }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label> Phone Number </label>
                    <input type="number"
                        value={phoneNumber}
                        onChange={(e) => { setPhoneNumber(e.target.value) }}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-secondary" type="submit">Save</button>
            </form>
        </ >
    )
}
export default Home;