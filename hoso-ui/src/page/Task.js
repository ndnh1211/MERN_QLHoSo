import React, { useCallback, useEffect, useState } from 'react'
import './Task.css'
import { toast } from 'react-toastify';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ModalEditTask from '../components/ModalEditTask';
import ModalAddTask from '../components/ModalAddTask';
import useAuthStore from '../store/authStore'
import useTaskStore from '../store/taskStore';

const Task = () => {
    const { account } = useAuthStore()
    const { getAllTask, deleteTask } = useTaskStore()
    const [showModalAddTask, setShowModalAddTask] = useState(false)
    const [allTask, setAllTask] = useState([])
    const [valueTask, setValueTask] = useState()
    const [showModalEditTask, setShowModalEditTask] = useState(false)
    const getTask = useCallback(async () => {
        const res = await getAllTask()
        if (res.success) {
            setAllTask(res.data)
        }
        if (res.error) {
            toast.error(res.message)
        }
    }, [getAllTask])
    useEffect(() => {
        getTask()
    }, [getTask])
    const deleteTaskById = async (_id) => {
        const confirm = window.confirm(`Are you sure to delete task with id: ${_id}?`)
        if (confirm === true) {
            const res = await deleteTask(_id)
            if (res.success) {
                await getTask()
                toast.success(res.message)
            }
            if (res.error) {
                toast.error('Xóa công việc không thành công !')
            }
        }
    }
    const handleOpenModal = (task) => {
        setShowModalEditTask(true)
        setValueTask(task)
    }
    return (
        <>
            <div className='task_container'>
                <div className='task_title'>
                    <h3>Task</h3>
                    {
                        account?.vai_tro === 'ADMIN' && <button className='btn btn-primary' onClick={() => { setShowModalAddTask(true) }}>Add Task & Workflow</button>
                    }
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th className='text-center' scope="col">Task Name</th>
                            <th className='text-center' scope="col">Description</th>
                            <th className='text-center' scope="col">Assigned_To</th>
                            <th className='text-center' scope="col">Assignor </th>
                            <th className='text-center' scope="col">Due_Date</th>
                            <th className='text-center' scope="col">Status</th>
                            <th className='text-center' scope="col">Task Type</th>
                            {
                                account.vai_tro === 'ADMIN' && <th className='text-center' scope="col">Action</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allTask?.length > 0 && allTask?.map((item, index) => {
                                if (account.vai_tro === "USER" && item.assigned_to._id === account._id) {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center'>{item.task_name}</td>
                                            <td className='text-center'>{item.description}</td>
                                            <td className='text-center'>{item.assigned_to.first_name + ' ' + item.assigned_to.last_name}</td>
                                            <td className='text-center'>{item.assignor.first_name + " " + item.assignor.last_name}</td>
                                            <td className='text-center'>
                                                {new Date(item.due_date).toLocaleDateString('en-US', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className='text-center'>{item.status}</td>
                                            <td className='text-center'>{item.task_type}</td>
                                            {
                                                (account?._id === item.assignor._id || account?.vai_tro === 'ADMIN') &&
                                                <td className='action'>
                                                    {
                                                        account?._id === item.assignor._id && <button className='btn btn-success' onClick={() => handleOpenModal(item)}><CiEdit /></button>
                                                    }
                                                    {
                                                        account?.vai_tro === 'ADMIN' && <button className='btn btn-danger' onClick={() => deleteTaskById(item._id)}><MdDelete /></button>
                                                    }
                                                </td>
                                            }

                                        </tr>
                                    )
                                } else if (account.vai_tro === "ADMIN") {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center'>{item.task_name}</td>
                                            <td className='text-center'>{item.description}</td>
                                            <td className='text-center'>{item.assigned_to.first_name + ' ' + item.assigned_to.last_name}</td>
                                            <td className='text-center'>{item.assignor.first_name + " " + item.assignor.last_name}</td>
                                            <td className='text-center'>
                                                {new Date(item.due_date).toLocaleDateString('en-US', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className='text-center'>{item.status}</td>
                                            <td className='text-center'>{item.task_type}</td>
                                            {
                                                (account?._id === item.assignor._id || account?.vai_tro === 'ADMIN') &&
                                                <td className='action'>
                                                    {
                                                        account?._id === item.assignor._id && <button className='btn btn-success' onClick={() => handleOpenModal(item)}><CiEdit /></button>
                                                    }
                                                    {
                                                        account?.vai_tro === 'ADMIN' && <button className='btn btn-danger' onClick={() => deleteTaskById(item._id)}><MdDelete /></button>
                                                    }
                                                </td>
                                            }

                                        </tr>
                                    )
                                } else {
                                    return <></>
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                showModalEditTask === true && <ModalEditTask
                    showModalEditTask={showModalEditTask}
                    setShowModalEditTask={setShowModalEditTask}
                    getAllTask={getTask}
                    task={valueTask} />
            }
            {
                showModalAddTask && <ModalAddTask
                    showModalAddTask={showModalAddTask}
                    setShowModalAddTask={setShowModalAddTask}
                    getAllTask={getTask}

                />
            }
        </>
    )
}

export default Task
