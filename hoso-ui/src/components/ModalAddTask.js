import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalAddTask.css'
import { toast } from 'react-toastify';
import useTaskStore from '../store/taskStore';
import useAccountStore from '../store/accountStore';
import useWorkflowStore from '../store/workflowStore';

const ModalAddTask = ({ showModalAddTask, setShowModalAddTask, getAllTask }) => {
    const [taskName, setTaskName] = useState('')
    const [description, setDecription] = useState('')
    const [taskType, setTaskType] = useState('')
    const [selectedAssignedUser, setSelectedAssignedUser] = useState('')
    const [dataUser, setDataUser] = useState([])
    const [dueDate, setDueDate] = useState(new Date().toLocaleDateString('en-CA'))
    const [status, setStatus] = useState('')
    const { addTask } = useTaskStore()
    const { getAccountUser } = useAccountStore()

    //Workflow
    const [workflowName, setWorkflowName] = useState('')
    const [descriptionWorkflow, setDecriptionWorkflow] = useState('')
    const { addWorkflow } = useWorkflowStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res1 = await addTask(taskName, description, selectedAssignedUser, dueDate, status, taskType)
        if (res1.success) {
            await getAllTask()
        }
        if (res1.error) {
            toast.error(res1.message)
            setShowModalAddTask(false)
            return;
        }

        const res = await addWorkflow(workflowName, descriptionWorkflow, res1.data._id)
        if (res.success) {
            toast.success("Bạn đã thêm quy trình công việc thành công!")
        }
        if (res.error) {
            toast.error(res.message)
        }

        setShowModalAddTask(false)
    }
    const getAllUser = useCallback(async () => {
        const res = await getAccountUser()
        if (res.success) {
            setDataUser(res.data)
        }
        if (res.derror) {
            toast.error('Lỗi lấy người dùng!')
        }
    }, [getAccountUser])
    useEffect(() => {
        getAllUser()
    }, [getAllUser])
    return (
        <Modal size='lg' show={showModalAddTask} onHide={() => setShowModalAddTask(false)}>
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task & Workflow</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-container'>
                        <div className='form-item1'>
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
                                    <option value={''}>Select...</option>
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
                                <label >status</label>
                                <select className='form-control' onChange={(e) => { setStatus(e.target.value) }}>
                                    <option value={''}>
                                        Select...
                                    </option>
                                    <option value={'New'}>
                                        New
                                    </option>
                                    <option value={'Doing'}>
                                        Doing
                                    </option>
                                    <option value={'Done'}>
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
                        <div className='form-item2'>
                            <div className="form-group">
                                <label >Workflow Name</label>
                                <input type="text"
                                    value={workflowName}
                                    onChange={(e) => { setWorkflowName(e.target.value) }}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label >Description</label>
                                <input type="text" className="form-control"
                                    value={descriptionWorkflow}
                                    onChange={(e) => { setDecriptionWorkflow(e.target.value) }}
                                />
                            </div>
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

export default ModalAddTask