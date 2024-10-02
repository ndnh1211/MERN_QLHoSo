import taskModel from "../models/TaskModel.js"
import accountModel from "../models/AccountModel.js"
import workflowModel from "../models//WorkflowModel.js"
export const AddTask = async (req, res) => {
    try {
        const checkAccount = await accountModel.findById(req.account_id)
        if (checkAccount.vai_tro === 'USER') {
            return res.json({
                error: true,
                success: false,
                message: 'Tính năng chỉ được dùng cho ADMIN!'
            })
        }
        const { task_name, description, assigned_to, due_date, status, task_type } = req.body
        if (!task_name) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa nhập tên công việc!'
            })
        }
        if (!description) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa mô tả công việc!!'
            })
        }
        if (!assigned_to) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa có id người dùng được giao công việc !'
            })
        }
        if (!due_date) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa nhập ngày đến hạn!!'
            })
        }
        if (!status) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa có trạng thái công việc!!'
            })
        }
        if (!task_type) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa có loại công việc!!'
            })
        }
        const createTask = await taskModel.create({
            task_name: task_name,
            description: description,
            assigned_to: assigned_to,
            assignor: req.account_id, // id người giao việc
            due_date: due_date,
            status: status,
            task_type
        })
        const saveTask = await createTask.save()
        return res.json({
            error: false,
            success: true,
            data: saveTask,
            message: 'Công việc đã được giao!!'
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            success: false,
            message: 'Giao công việc không thành công !'
        })
    }
}

export const getAllTask = async (req, res) => {
    try {
        const task = await taskModel.find().populate('assignor').populate('assigned_to')
        if (task) {
            return res.json({
                error: false,
                success: true,
                data: task,
                message: 'Lấy dữ liệu công việc thành công!!'
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Lấy dữ liệu công việc không thành công!!'
        })
    }
}
export const deleteTaskById = async (req, res) => {
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
        const deleteWorkflowById = await workflowModel.deleteOne({ task_id: _id })

        const deleteTaskById = await taskModel.deleteOne({ _id: _id })
        if (deleteTaskById) {
            return res.json({
                success: true,
                error: false,
                message: `Xóa công việc ${_id} thành công!!`
            })
        }
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Tính năng chỉ được sử dụng cho ADMIN!!'
        })
    }
}
export const getTaskById = async (req, res) => {
    try {
        const { _id } = req.params
        const getTask = await taskModel.findById(_id)
        if (getTask) {
            return res.json({
                error: false,
                success: true,
                data: getTask,
                message: `Lấy dữ liệu công việc ${_id} thành công!!`
            })
        }
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Lấy dữ liệu công việc không thành công!!'
        })
    }
}
export const getTaskNew = async (req, res) => {
    try {
        const getNewTask = await taskModel.find({ assigned_to: req.account_id, status: "New" })
            .populate('assignor')
        if (getNewTask.length > 0) {
            return res.json({
                error: false,
                success: true,
                data: getNewTask,
                message: `Bạn được giao ${getNewTask.length} công việc mới!!`
            })
        }
        return res.json({
            error: false,
            success: true,
            message: "Không có công việc mới nào!!"
        })
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: "Lỗi!"
        })
    }
}
export const updateTaskById = async (req, res) => {
    try {
        const checkAccount = await accountModel.findById(req.account_id)
        if (checkAccount.vai_tro === 'USER') {
            return res.json({
                error: true,
                success: false,
                message: 'Quyền Cập nhật chỉ dành cho ADMIN!!'
            })
        }
        const {
            _id,
            task_name,
            status,
            description,
            assigned_to,
            due_date,
            task_type
        } = req.body
        const updateTask = await taskModel.updateOne(
            { _id },
            {
                task_name,
                status,
                description,
                assigned_to,
                due_date,
                task_type
            }

        )
        return res.json({
            error: false,
            success: true,
            message: 'Cập nhật công việc thành công!!'
        })

    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Cập nhật công việc không thành công!!'
        })
    }
}