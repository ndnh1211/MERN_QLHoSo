import axios from 'axios';
import { create } from 'zustand'
const API_URL = process.env.NODE_ENV === "development" ? `http://localhost:1000/api` : "/api"

const useWorkflowStore = create((set) => ({
    isLoading: false,
    error: null,

    getAllWorkflow: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${API_URL}/get-all-workflow`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || " Error Get All Workflow" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    deleteWorkflow: async (_id) => {
        set({ isLoading: true })
        try {
            const res = await axios.delete(`${API_URL}/delete-workflow-by-id/${_id}`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Delete Workflow" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    addWorkflow: async (workflow_name, description, task_id) => {
        set({ isLoading: true })
        try {
            const res = await axios.post(`${API_URL}/add-workflow`,
                {
                    workflow_name,
                    description,
                    task_id
                },
                { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Add Workflow" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    updateWorkflow: async (_id, workflow_name, description, task_id) => {
        set({ isLoading: true })
        try {
            const res = await axios.put(`${API_URL}/update-workflow-by-id`,
                {
                    _id,
                    workflow_name,
                    description,
                    task_id
                }
                , { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Update Workflow" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    getMyWorkflow: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${API_URL}/get-my-workflow`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Get My Workflow" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    }
}))
export default useWorkflowStore