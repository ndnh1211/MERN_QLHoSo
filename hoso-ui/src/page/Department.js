import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import ModalEditDepartment from '../components/ModalEditDepartment'
import ModalAddDepartment from '../components/ModalAddDepartment'
import useAuthStore from '../store/authStore'
import "./Department.css"
import useDepartmentStore from '../store/departmentStore'
import useAccountStore from '../store/accountStore'
const Department = () => {
    const [showModalEditDepartment, setShowModalEditDepartment] = useState(false)
    const [allDepartment, setAllDepartment] = useState([])
    const [valueDepartment, setValueDepartment] = useState()
    const [showModalAddDepartment, setShowModalAddDepartment] = useState(false)
    const { account } = useAuthStore()
    const { getAccountAdmin } = useAccountStore()
    const { getAllDepartment, deleteDepartment } = useDepartmentStore()
    const [dataAdmin, setDataAdmin] = useState([])
    const getAdmin = useCallback(async () => {
        const res = await getAccountAdmin()
        if (res.success) {
            setDataAdmin(res.data)
        }
        if (res.error) {
            toast.error(res.message)
        }
    }, [getAccountAdmin])
    useEffect(() => {
        if (account?.vai_tro === "ADMIN") {
            getAdmin()
        }
    }, [getAdmin, account])
    const getDepartment = useCallback(async () => {
        const res = await getAllDepartment()
        if (res.success) {
            setAllDepartment(res.data)
        }
        if (res.error) {
            toast.error(res.message)
        }
    }, [getAllDepartment])
    useEffect(() => {
        getDepartment()
    }, [getDepartment])

    const deleteDepartmentById = async (_id) => {
        const confirm = window.confirm(`Are you sure delete Department with id : ${_id}?`)
        if (confirm === true) {
            const res = await deleteDepartment(_id)
            if (res.success) {
                await getDepartment()
                toast.success(res.message) //Truyền data bên kia rồi còn .data làm gì
            }
            if (res.error) {
                toast.error('Xóa phòng ban không thành công!')
            }
        }
    }
    const handleOpenModal = (department) => {
        setShowModalEditDepartment(true)
        setValueDepartment(department)
    }
    return (
        <>
            <div className='department_container'>
                <div className='department_title'>
                    <h3>Department</h3>
                    {
                        account?.vai_tro === 'ADMIN' && <button className='btn btn-primary' onClick={() => { setShowModalAddDepartment(true) }}>Add Department</button>
                    }
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th className='text-center' scope="col">#</th>
                            <th className='text-center' scope="col">ID</th>
                            <th className='text-center' scope="col">Department Name</th>
                            <th className='text-center' scope="col">Manager</th>
                            <th className='text-center' scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDepartment?.length > 0 && allDepartment?.map((item, index) => {
                                const stt = index + 1;
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>{stt}</td>
                                        <td className='text-center'>{item._id}</td>
                                        <td className='text-center'>{item.department_name}</td>
                                        <td className='text-center'>{item.manager_id.first_name + " " + item.manager_id.last_name}</td>
                                        {
                                            account?.vai_tro === 'ADMIN' && <td className='action'>
                                                <button className='btn btn-success' onClick={() => handleOpenModal(item)}><CiEdit /></button>
                                                <button className='btn btn-danger' onClick={() => deleteDepartmentById(item._id)}><MdDelete /></button>
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
                showModalEditDepartment === true && <ModalEditDepartment
                    showModalEditDepartment={showModalEditDepartment}
                    setShowModalEditDepartment={setShowModalEditDepartment}
                    getAllDepartment={getDepartment}
                    department={valueDepartment}
                    dataAdmin={dataAdmin}
                />
            }
            {
                showModalAddDepartment && <ModalAddDepartment
                    showModalAddDepartment={showModalAddDepartment}
                    setShowModalAddDepartment={setShowModalAddDepartment}
                    getAllDepartment={getDepartment}
                    dataAdmin={dataAdmin}
                />
            }
        </>
    )
}

export default Department