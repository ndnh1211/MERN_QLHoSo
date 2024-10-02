import { Router } from "express";
import { signup, login, verifyAccount, logout, updateProfile } from "../controllers/AuthController.js";
import { authToken } from "../middleware/authToken.js";
import {
    deleteAccountById,
    getAccountAdmin,
    getAccountById,
    getAccountUser,
    getAllAccount,
    updateAccountById
} from "../controllers/AccountController.js";
import {
    AddTask,
    deleteTaskById,
    getAllTask,
    getTaskNew,
    getTaskById,
    updateTaskById
} from "../controllers/TaskController.js";
import {
    AddDepartment,
    deleteDepartmentById,
    getAllDepartment,
    getDepartmentById,
    updateDepartmentById
} from "../controllers/DepartmentController.js";
import {
    AddWorkflow,
    deleteWorkflow,
    getAllWorkflow,
    getMyWorkflow,
    getWorkflow,
    updateWorkflowById
} from "../controllers/WorkflowController.js";



const router = Router()
//Authentication
router.post('/api/signup', signup)
router.post('/api/login', login)
router.get('/api/verify', authToken, verifyAccount)
router.get('/api/logout', logout)
router.put('/api/update-profile', authToken, updateProfile)

//Account
router.get('/api/get-all-account', authToken, getAllAccount)
router.delete('/api/delete-account-by-id/:_id', authToken, deleteAccountById)
router.put('/api/update-account-by-id', authToken, updateAccountById)
router.get('/api/get-account-by-id/:_id', authToken, getAccountById)
router.get('/api/get-user', authToken, getAccountUser)
router.get('/api/get-admin', authToken, getAccountAdmin)


//Task
router.post('/api/add-task', authToken, AddTask)
router.get('/api/get-all-task', authToken, getAllTask)
router.delete('/api/delete-task-by-id/:_id', authToken, deleteTaskById)
router.get('/api/get-task-by-id/:_id', authToken, getTaskById)
router.put('/api/update-task-by-id', authToken, updateTaskById)
router.get('/api/get-task-new', authToken, getTaskNew)

//Department
router.post('/api/add-department', authToken, AddDepartment)
router.get('/api/get-all-department', authToken, getAllDepartment)
router.delete('/api/delete-department-by-id/:_id', authToken, deleteDepartmentById)
router.put('/api/update-department-by-id', authToken, updateDepartmentById)
router.get('/api/get-department-by-id/:_id', authToken, getDepartmentById)

// Workflow
router.post('/api/add-workflow', authToken, AddWorkflow)
router.get('/api/get-all-workflow', authToken, getAllWorkflow)
router.delete('/api/delete-workflow-by-id/:_id', authToken, deleteWorkflow)
router.put('/api/update-workflow-by-id', authToken, updateWorkflowById)
router.get('/api/get-workflow-by-id/:_id', authToken, getWorkflow)
router.get('/api/get-my-workflow', authToken, getMyWorkflow)
export default router

