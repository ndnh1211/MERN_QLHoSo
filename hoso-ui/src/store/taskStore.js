import axios from 'axios';
import { create } from 'zustand'
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`


const useTaskStore = create((set) => ({
    isLoading: false,
    error: null,
    getAllTask: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${API_URL}/get-all-task`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Get All Task" })
            throw error;
        } finally {
            set({ isLoading: false })
        }
    },
    deleteTask: async (_id) => {
        set({ isLoading: true })
        try {
            const res = await axios.delete(`${API_URL}/delete-task-by-id/${_id}`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Delete Task" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    addTask: async (taskName, description, selectedAssignedUser, dueDate, status, taskType) => {
        set({ isLoading: true })
        try {
            const res = await axios.post(`${API_URL}/add-task`,
                {
                    task_name: taskName,
                    description: description,
                    assigned_to: selectedAssignedUser,
                    due_date: dueDate,
                    status: status,
                    task_type: taskType
                }, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Add Task" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    updateTask: async (_id, taskName, description, selectedAssignedUser, dueDate, status, taskType) => {
        set({ isLoading: true })
        try {
            const res = await axios.put(`${API_URL}/update-task-by-id`, {
                _id: _id,
                task_name: taskName,
                description: description,
                assigned_to: selectedAssignedUser,
                due_date: dueDate,
                status: status,
                task_type: taskType
            }, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Update Task" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    getTaskNew: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${API_URL}/get-task-new`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Get Task New" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    }

}))
export default useTaskStore