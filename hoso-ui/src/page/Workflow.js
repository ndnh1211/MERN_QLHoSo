import React, { useCallback, useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import './Workflow.css'
import useWorkflowStore from '../store/workflowStore';
import { toast } from 'react-toastify'
import ModalEditWorkflow from '../components/ModalEditWorkflow';
import useTaskStore from '../store/taskStore';
import useAuthStore from '../store/authStore';

const Workflow = () => {
    const { account } = useAuthStore()
    const { getAllWorkflow, deleteWorkflow, getMyWorkflow } = useWorkflowStore()
    const [dataWorkflow, setDataWorkflow] = useState([])
    const [showModalEditWorkflow, setShowModalEditWorkflow] = useState(false)
    const [workflow, setWorkflow] = useState({})
    const [dataTask, setDataTask] = useState([])
    const [dataMyWorkflow, setDataMyWorkfow] = useState([])
    const [myWorkflow1, setMyWorkflow1] = useState({})
    const { getAllTask } = useTaskStore()

    const myWorkflow = useCallback(async () => {
        const res = await getMyWorkflow()
        if (res.success) {
            setDataMyWorkfow(res.data)
        }
        if (res.error) {
            toast.error(res.message)
        }
    }, [getMyWorkflow])
    const getWorkflow = useCallback(async () => {
        const res = await getAllWorkflow()
        if (res.success) {
            setDataWorkflow(res.data)
        }
        if (res.error) {
            toast.error(res.message)
        }
    }, [getAllWorkflow])
    useEffect(() => {
        myWorkflow()
        getWorkflow()
    }, [getWorkflow, myWorkflow])
    const getTask = useCallback(async () => {
        const res = await getAllTask()
        if (res.success) {
            setDataTask(res.data)
        }
        if (res.error) {
            toast.error(res.message)
        }
    }, [getAllTask])
    useEffect(() => {
        getTask()
    }, [getTask])
    const handleDeleteWorkflow = async (_id) => {
        const confirm = window.confirm(`Are you sure to delete this workflow with ID: ${_id}?`);
        if (confirm) {
            const res = await deleteWorkflow(_id)
            if (res.success) {
                await getWorkflow()
                toast.success(res.message)
            }
            if (res.error) {
                toast.error(res.message)
            }
        }
    }
    return (
        <div className='workflow-container'>
            <div className='workflow-top'>
                <h3>Workflow</h3>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th className='text-center' scope="col">#</th>
                        <th className='text-center' scope="col">Workflow Name</th>
                        <th className='text-center' scope="col">Description</th>
                        <th className='text-center' scope="col">Task Name</th>
                        <th className='text-center' scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        account.vai_tro === "ADMIN" && dataWorkflow.length > 0 && dataWorkflow.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td className='text-center'>{item.workflow_name}</td>
                                    <td className='text-center description'>{item.description}</td>
                                    <td className='text-center'>{item.task_id.task_name}</td>
                                    <td className='action'>
                                        <button className='btn btn-success' onClick={() => { setShowModalEditWorkflow(true); setWorkflow(item) }}><CiEdit /></button>
                                        {
                                            account.vai_tro === 'ADMIN' && <button className='btn btn-danger' onClick={() => { handleDeleteWorkflow(item._id) }}><MdDelete /></button>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        account.vai_tro === 'USER' && dataMyWorkflow.length > 0 && dataMyWorkflow.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td className='text-center'>{item.workflow_name}</td>
                                    <td className='text-center description'>{item.description}</td>
                                    <td className='text-center'>{item.task_id.task_name}</td>
                                    <td className='action'>
                                        <button className='btn btn-success' onClick={() => { setShowModalEditWorkflow(true); setMyWorkflow1(item) }}><CiEdit /></button>
                                        {
                                            account.vai_tro === 'ADMIN' && <button className='btn btn-danger' onClick={() => { handleDeleteWorkflow(item._id) }}><MdDelete /></button>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                showModalEditWorkflow && <ModalEditWorkflow
                    showModalEditWorkflow={showModalEditWorkflow}
                    setShowModalEditWorkflow={setShowModalEditWorkflow}
                    workflow={account.vai_tro === "ADMIN" ? workflow : myWorkflow1}
                    getWorkflow={account.vai_tro === 'ADMIN' ? getWorkflow : myWorkflow}
                    dataTask={dataTask}
                />
            }
        </div>
    )
}

export default Workflow