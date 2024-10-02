import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import './ModalEditWorkflow.css'
import { toast } from 'react-toastify';
import useWorkflowStore from '../store/workflowStore';

const ModalEditWorkflow = ({ showModalEditWorkflow, setShowModalEditWorkflow, workflow, getWorkflow, dataTask }) => {
    const [workflowName, setWorkflowName] = useState(workflow?.workflow_name)
    const [description, setDecription] = useState(workflow?.description)
    const { updateWorkflow } = useWorkflowStore()
    const [selectedTask, setSelectedTask] = useState(workflow?.task_id?._id)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await updateWorkflow(workflow?._id, workflowName, description, selectedTask)
        if (res.success) {
            await getWorkflow()
            toast.success(res.message)
            setShowModalEditWorkflow(false)
        }
        if (res.error) {
            toast.error(res.message)
        }
    }


    return (
        <Modal size='lg' show={showModalEditWorkflow} onHide={() => setShowModalEditWorkflow(false)}>
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Workflow</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-item'>
                        <div className="form-group">
                            <label >ID</label>
                            <input type="text"
                                value={workflow?._id}
                                disabled className="form-control" />
                        </div>

                        <div className="form-group">
                            <label >Workflow Name</label>
                            <input type="text"
                                value={workflowName}
                                onChange={(e) => { setWorkflowName(e.target.value) }}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Description</label>
                            <textarea type="text" className="form-control"
                                value={description}
                                rows={3}
                                onChange={(e) => { setDecription(e.target.value) }}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label >Task</label>
                            <select disabled className='form-control' onChange={(e) => { setSelectedTask(e.target.value) }}>
                                {
                                    dataTask.length > 0 && dataTask.map((item, index) => {
                                        return (
                                            <option value={item._id} key={index} selected={selectedTask === item._id}>
                                                {item.task_name}
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

export default ModalEditWorkflow