import taskModel from "../models/TaskModel";

export const checkTask = async (req, res, next) => {
    const checkTask = await taskModel.findById(req.task_id)
    if (checkTask.status !== 'New') {
        return res.json({
            error: true,
            success: false,
            message: 'Lỗi!!'
        })
    }
    next();
}