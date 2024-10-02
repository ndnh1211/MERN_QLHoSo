import axios from 'axios';
import { create } from 'zustand'
const API_URL = process.env.NODE_ENV === "development" ? `http://localhost:1000/api` : "/api"

const useDepartmentStore = create((set) => ({
    isLoading: false,
    error: null,
    addDepartment: async (departmentName, selectedManager) => {
        set({ isLoading: true })
        try {
            const res = await axios.post(`${API_URL}/add-department`,
                {
                    department_name: departmentName,
                    manager_id: selectedManager
                }, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Add Department" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    getAllDepartment: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${API_URL}/get-all-department`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Get All Department" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    editDepartment: async (department, departmentName, selectedManager) => {
        set({ isLoading: true })
        try {
            const res = await axios.put(`${API_URL}/update-department-by-id`, {
                _id: department?._id,
                department_name: departmentName,
                manager_id: selectedManager
            }, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Edit Department" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    deleteDepartment: async (_id) => {
        set({ isLoading: true })
        try {
            const res = await axios.delete(`${API_URL}/delete-department-by-id/${_id}`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Delete Department" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
}))
export default useDepartmentStore