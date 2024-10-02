import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useDepartmentStore from '../store/departmentStore'

export const ModalAddDepartment = ({ dataAdmin, showModalAddDepartment, setShowModalAddDepartment, getAllDepartment, department }) => {
    const [selectedManager, setSelectedManager] = useState(department?.manager_id?._id)
    const [departmentName, setDepartmentName] = useState('')
    const { addDepartment } = useDepartmentStore()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await addDepartment(departmentName, selectedManager)
        if (res.success) {
            toast.success(res.message)
            await getAllDepartment()
        }
        if (res.error) {
            toast.error(res.message)
        }
        setShowModalAddDepartment(false)
    }
    return (
        <Modal size='lg' show={showModalAddDepartment} onHide={() => setShowModalAddDepartment(false)}>
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-item'>
                        <div className="form-group">
                            <label >Department Name</label>
                            <input type="text"
                                value={departmentName}
                                onChange={(e) => { setDepartmentName(e.target.value) }}
                                className="form-control" />
                        </div>

                        <div className="form-group">
                            <label >Manager</label>
                            <select className='form-control' onChange={(e) => { setSelectedManager(e.target.value) }}>
                                <option value={''}>Select...</option>
                                {
                                    dataAdmin.length > 0 && dataAdmin.map((item, index) => {
                                        return (
                                            <option value={item._id} key={index}>
                                                {
                                                    item.first_name + " " + item.last_name
                                                }
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type='submit'>
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal >

    )
}
export default ModalAddDepartment