import workflowModel from "../models/WorkflowModel.js";
import taskModel from "../models/TaskModel.js";
import accountModel from "../models/AccountModel.js";

export const AddWorkflow = async (req, res) => {
    try {
        const checkAccount = await accountModel.findById(req.account_id)
        if (checkAccount.vai_tro != 'ADMIN') {
            return res.json({
                error: true,
                success: false,
                message: 'Tính năng chỉ sử dụng cho ADMIN!'
            })
        }
        const { workflow_name, description, task_id } = req.body

        if (!workflow_name) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa nhập tên quy trình!'
            })
        }
        if (!task_id) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa có id công việc!'
            })
        }
        const createWorkflow = await workflowModel.create({
            workflow_name,
            description,
            task_id
        })
        const saveWorkflow = await createWorkflow.save()
        return res.json({
            error: false,
            success: true,
            data: saveWorkflow,
            message: 'Quy trình đã được thêm!'
        })
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: "Thêm quy trình công việc không thành công!"
        })
    }
}
export const getAllWorkflow = async (req, res) => {
    try {
        const workflow = await workflowModel.find().populate('task_id')
        if (workflow) {
            return res.json({
                error: false,
                success: true,
                data: workflow,
                message: 'Lấy dữ liệu quy trình công việc thành công!'
            })
        }
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: "Lấy dữ liệu quy trình không thành công!"
        })
    }
}
export const deleteWorkflow = async (req, res) => {
    try {
        const { _id } = req.params;
        const checkAccount = await accountModel.findById(req.account_id)
        if (checkAccount.vai_tro === 'USER') {
            return res.json({
                error: true,
                success: false,
                message: 'Tính năng chỉ dành cho ADMIN!'
            })
        }
        const deleteWorkflowById = await workflowModel.deleteOne({ _id: _id })
        if (deleteWorkflowById) {
            return res.json({
                error: false,
                success: true,
                message: `Xóa quy trình công việc ${_id} thành công !`
            })
        }
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Xóa quy trình công việc không thành công!'
        })
    }
}
export const getWorkflow = async (req, res) => {
    try {
        const { _id } = req.params
        const getWorkflow = await workflowModel.findById(_id)
        if (getWorkflow) {
            return res.json({
                error: false,
                success: true,
                message: `Lấy dữ liệu công việc ${_id} thành công!`
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Lấy dữ liệu quy trình không thành công!'
        })
    }
}
export const getMyWorkflow = async (req, res) => {
    try {
        const findTask = await taskModel.find({ //Lấy tất cả công việc của mình
            assigned_to: req.account_id
        })
        if (findTask.length > 0) {
            const myWorkFlow = await Promise.all(findTask.map(async (item) => {
                {
                    const getWorkFlow = await workflowModel.findOne({ task_id: item._id }).populate({ path: "task_id", populate: "assigned_to" })
                    return getWorkFlow
                }
            }))
            //Quy trình công việc của mình theo task_id
            return res.json({
                error: false,
                success: true,
                data: myWorkFlow,
                message: "Lấy quy trình công việc thành công!"
            })
        } else {
            return res.json({
                error: false,
                success: true,
                message: "Không tồn tại công việc của bạn"
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Lỗi!'
        })
    }
}
export const updateWorkflowById = async (req, res) => {
    try {
        const {
            _id,
            workflow_name,
            description,
            task_id
        } = req.body;
        if (!_id || !workflow_name || !task_id) {
            return res.json({
                error: true,
                success: false,
                message: 'Không đủ dữ liệu để cập nhật quy trình'
            })
        }
        const checkAssigned_to = await taskModel.findById(task_id)
        const checkAccount = await accountModel.findById(req.account_id)

        if (String(checkAssigned_to?.assigned_to) !== String(checkAccount._id) && checkAccount.vai_tro !== 'ADMIN') {
            return res.json({
                error: true,
                success: false,
                message: 'Quyền cập nhật chỉ dành cho ADMIN hoặc người được giao việc!'
            })
        }

        const updateWorkflow = await workflowModel.updateOne(
            { _id },
            {
                workflow_name,
                description,
                task_id
            }
        )
        return res.json({
            error: false,
            success: true,
            message: 'Cập nhật quy trình thành công!'
        })
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Cập nhật quy trình không thành công!'
        })
    }
}