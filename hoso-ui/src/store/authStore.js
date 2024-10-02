import axios from 'axios';
import { create } from 'zustand'

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`
const useAuthStore = create((set) => ({
    account: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    //Authentication
    signup: async (firstName, lastName, email, password, ngaySinh, phoneNumber) => {
        set({ isLoading: true })
        try {
            const response = await axios.post(`${API_URL}/signup`,
                {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    ngaySinh,
                    phoneNumber
                })
            return response.data;
        } catch (error) {
            set({ error: error.message || "Error sign up" })
            throw error;
        } finally {
            set({ isLoading: false })
        }
    },
    login: async (email, password) => {
        set({ isLoading: true })
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true })
            if (response.data.success) {
                set({ account: response.data.data, isAuthenticated: true })
            }
            return response.data;
        } catch (error) {
            set({ error: error.message || "Error Login" })
            throw error;
        } finally {
            set({ isLoading: true })
        }
    },
    logout: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${API_URL}/logout`, { withCredentials: true })
            if (res.data.success === true) {
                set({ account: null, isAuthenticated: false }) //Logout như này mới ra được trang login ạ
            }
            return res.data;
        } catch (error) {
            set({ error: error.message || "Error Login" })
            throw error;
        } finally {
            set({ isLoading: false })
        }
    },
    verify: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axios.get(`${API_URL}/verify`, { withCredentials: true })
            if (res.data.success) {
                set({ account: res.data.data, isCheckingAuth: false, isAuthenticated: true })
            }
        } catch (error) {
            set({ isCheckingAuth: false })
            console.log(error);
        }
    }
}))

export default useAuthStore