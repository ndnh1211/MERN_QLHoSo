import { useState } from "react"
import { toast } from "react-toastify"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useDepartmentStore from "../store/departmentStore";

const ModalEditDepartment = ({ department, showModalEditDepartment, setShowModalEditDepartment, getAllDepartment, dataAdmin }) => {
    const [departmentName, setDepartmentName] = useState(department?.department_name)
    const [selectedManager, setSelectedManager] = useState(department.manager_id._id)
    const { editDepartment } = useDepartmentStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await editDepartment(department, departmentName, selectedManager)
        if (res.success) {
            await getAllDepartment()
            toast.success(res.message)
            setShowModalEditDepartment(false)
        }
        if (res.error) {
            toast.error(res.message)
        }
    }
    return (
        <Modal size='lg' show={showModalEditDepartment} onHide={() => setShowModalEditDepartment(false)}>
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-item'>
                        <div className="form-group">
                            <label >ID</label>
                            <input type="text"
                                value={department?._id}
                                disabled className="form-control" />
                        </div>

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
export default ModalEditDepartment