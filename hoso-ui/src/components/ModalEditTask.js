import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalEditTask.css'
import { toast } from 'react-toastify';
import useAccountStore from '../store/accountStore';
import useTaskStore from '../store/taskStore';

const ModalEditTask = ({ showModalEditTask, setShowModalEditTask, task, getAllTask }) => {
    const [taskName, setTaskName] = useState(task?.task_name)
    const [taskType, setTaskType] = useState(task?.task_type)
    const [description, setDecription] = useState(task?.description)
    const [selectedAssignedUser, setSelectedAssignedUser] = useState(task?.assigned_to?._id)
    const [dueDate, setDueDate] = useState(new Date(task?.due_date).toLocaleDateString('en-CA'))
    const [status, setStatus] = useState(task?.status)
    const [dataUser, setDataUser] = useState([])
    const { getAccountUser } = useAccountStore()
    const { updateTask } = useTaskStore()
    const getAllUser = useCallback(async () => {
        const res = await getAccountUser()
        if (res.success) {
            setDataUser(res.data)
        }
        if (res.error) {
            toast.error('Lỗi lấy người dùng!')
        }
    }, [getAccountUser])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await updateTask(task?._id, taskName, description, selectedAssignedUser, dueDate, status, taskType)
        if (res.success) {
            await getAllTask()
            toast.success(res.message)
            setShowModalEditTask(false)
        }
        if (res.error) {
            toast.error(res.message)
        }
    }

    useEffect(() => {
        getAllUser()
    }, [getAllUser])

    return (
        <Modal size='lg' show={showModalEditTask} onHide={() => setShowModalEditTask(false)}>
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-item'>
                        <div className="form-group">
                            <label >ID</label>
                            <input type="text"
                                value={task?._id}
                                disabled className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Assignor</label>
                            <input type="text"
                                value={task?.assignor?.first_name + ' ' + task?.assignor?.last_name}
                                disabled className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Task Name</label>
                            <input type="text"
                                value={taskName}
                                onChange={(e) => { setTaskName(e.target.value) }}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Description</label>
                            <input type="text" className="form-control"
                                value={description}
                                onChange={(e) => { setDecription(e.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label >Assigned To</label>
                            <select className='form-control' onChange={(e) => { setSelectedAssignedUser(e.target.value) }}>
                                {
                                    dataUser.length > 0 && dataUser.map((item, index) => {
                                        return (
                                            <option value={item._id} key={index} selected={selectedAssignedUser === item._id}>
                                                {item.first_name + ' ' + item.last_name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Due Date</label>
                            <input type="date" className="form-control"
                                value={dueDate}
                                onChange={(e) => { setDueDate(e.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label >Status</label>
                            <select className='form-control' onChange={(e) => { setStatus(e.target.value) }}>
                                <option value={''}>
                                    Select...
                                </option>
                                <option value={'New'} selected={status === 'New'}>
                                    New
                                </option>
                                <option value={'Doing'} selected={status === 'Doing'}>
                                    Doing
                                </option>
                                <option value={'Done'} selected={status === 'Done'}>
                                    Done
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Task Type</label>
                            <input type="text" className="form-control"
                                value={taskType}
                                onChange={(e) => { setTaskType(e.target.value) }}
                            />
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

export default ModalEditTask