import axios from 'axios';
import { create } from 'zustand'
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`


const useAccountStore = create((set) => ({
    isLoading: false,
    error: null,
    updateAccount: async (_id, firstName, lastName, ngaySinh, phoneNumber) => {
        set({ isLoading: true })
        try {
            const res = await axios.put(`${API_URL}/update-account-by-id`, {
                _id: _id,
                first_name: firstName,
                last_name: lastName,
                ngaySinh: ngaySinh,
                phoneNumber: phoneNumber
            }, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error UpdateAccount" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    getAccountAdmin: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${API_URL}/get-admin`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Get Account Admin" })
            throw error;
        } finally {
            set({ isLoading: false })
        }
    },
    getAccountUser: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${API_URL}/get-user`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Get Account User" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    getAllAccount: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${API_URL}/get-all-account`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Get All Account" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    deleteAccount: async (_id) => {
        set({ isLoading: true })
        try {
            const res = await axios.delete(`${API_URL}/delete-account-by-id/${_id}`, { withCredentials: true })
            return res.data
        } catch (error) {
            set({ error: error.message || "Error Delete Account" })
            throw error
        } finally {
            set({ isLoading: false })
        }
    }
}))

export default useAccountStore