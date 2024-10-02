import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './Account.css'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ModalEditAccount from '../components/ModalEditAccount';
import useAuthStore from '../store/authStore'
import useAccountStore from '../store/accountStore';
const Account = () => {
    const { account } = useAuthStore()
    const { getAllAccount, deleteAccount } = useAccountStore()
    const [allAccount, setAllAccount] = useState([])
    const [valueAccount, setValueAccount] = useState()
    const [showModalEditAccount, setShowModalEditAccount] = useState(false)
    const getAccount = useCallback(async () => {
        const res = await getAllAccount()
        if (res.success) {
            setAllAccount(res.data)
        }
        if (res.error) {
            toast.error('lỗi lấy tất cả dữ liệu người dùng !!')
        }
    }, [getAllAccount])
    useEffect(() => {
        getAccount()
    }, [getAccount])
    const deleteAccountById = async (_id) => {
        const confirm = window.confirm(`Are you sure to delete account with id: ${_id}?`)
        if (confirm === true) {
            const res = await deleteAccount(_id)
            if (res.success) {
                await getAllAccount()
                toast.success(res.message)
            }
            if (res.error) {
                toast.error('lỗi xóa người dùng!!')
            }
        }
    }
    const handleOpenModal = (account) => {
        setShowModalEditAccount(true)
        setValueAccount(account)
    }
    return (
        <>
            <div className='account_container'>
                <h3>Account</h3>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th className='text-center' scope="col">#</th>
                            <th className='text-center' scope="col">First Name</th>
                            <th className='text-center' scope="col">Last Name</th>
                            <th className='text-center' scope="col">Email</th>
                            <th className='text-center' scope="col">Role</th>
                            {
                                account?.vai_tro === 'ADMIN' && <th className='text-center' scope="col" >Action</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allAccount.length > 0 && allAccount.map((item, index) => {
                                const stt = index + 1;
                                return (
                                    <tr key={index}>
                                        <th scope="row">{stt}</th>
                                        <td className='text-center'>{item.first_name}</td>
                                        <td className='text-center'>{item.last_name}</td>
                                        <td className='text-center'>{item.email}</td>
                                        <td className='text-center'>{item.vai_tro}</td>
                                        {
                                            account?.vai_tro === 'ADMIN' && <td className='action'>
                                                <button className='btn btn-success' onClick={() => handleOpenModal(item)}><CiEdit /></button>
                                                {
                                                    account._id !== item._id &&
                                                    <button className='btn btn-danger'
                                                        onClick={() => deleteAccountById(item._id)}><MdDelete /></button>
                                                }
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                showModalEditAccount === true && <ModalEditAccount
                    showModalEditAccount={showModalEditAccount}
                    setShowModalEditAccount={setShowModalEditAccount}
                    getAllAccount={getAccount}
                    account={valueAccount} />
            }
        </>
    )
}

export default Account