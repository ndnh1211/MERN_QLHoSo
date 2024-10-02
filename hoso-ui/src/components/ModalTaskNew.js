import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalTaskNew.css'

const ModalTaskNew = ({ taskNew, openModalTaskNew, setOpenModalTaskNew }) => {
    return (
        <Modal size='lg' show={openModalTaskNew} onHide={() => setOpenModalTaskNew(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Task New</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có <span className='text-danger'>{taskNew.length}</span> công việc mới! </p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='text-center'>Task name</th>
                            <th className='text-center'>Assignor</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>CreatedAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taskNew.length > 0 && taskNew.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>{item.task_name}</td>
                                        <td className='text-center'>{item.assignor.first_name + " " + item.assignor.last_name}</td>
                                        <td className='text-center'>{item.status}</td>
                                        <td className='text-center'>{new Date(item.createdAt).toLocaleDateString('en-US', {
                                            year: '2-digit', month: '2-digit', day: 'numeric'
                                        })}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setOpenModalTaskNew(false)}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ModalTaskNew