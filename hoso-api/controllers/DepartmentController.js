import accountModel from "../models/AccountModel.js"
import departmentModel from "../models/DepartmentModel.js"

export const AddDepartment = async (req, res) => {
    const { department_name, manager_id } = req.body;
    try {
        if (!department_name) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa nhập tên phòng ban!'
            })
        }
        if (!manager_id) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa chọn người quản lý!'
            })
        }
        const createDepartment = await departmentModel.create({
            department_name,
            manager_id
        })
        const saveDepartment = await createDepartment.save()
        return res.json({
            error: false,
            success: true,
            data: saveDepartment,
            message: "Tạo mới phòng ban thành công!!"
        })
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: " Thêm mới phòng ban không thành công!"
        })

    }
}
export const getAllDepartment = async (req, res) => {
    try {
        const department = await departmentModel.find().populate("manager_id")
        if (department) {
            return res.json({
                error: false,
                success: true,
                data: department,
                message: "Lấy dữ liệu phòng ban thành công!!"
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: "Lấy tất cả phòng ban không thành công!!"
        })
    }
}
export const deleteDepartmentById = async (req, res) => {
    try {
        const { _id } = req.params
        const checkAccount = await accountModel.findById(req.account_id)

        if (checkAccount.vai_tro === 'USER') {
            return res.json({
                error: true,
                success: false,
                message: 'Tính năng chỉ dành cho ADMIN!'
            })
        }

        const deleteDepartmentById = await departmentModel.deleteOne({ _id: _id })
        if (deleteDepartmentById) {
            return res.json({
                success: true,
                error: false,
                message: `Xóa phòng ban ${_id} thành công!!`
            })
        }
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: "Tính năng chỉ được sử dụng cho ADMIN!"
        })
    }
}

export const getDepartmentById = async (req, res) => {
    try {
        const { _id } = req.params
        const getDepartment = await departmentModel.findById(_id)
        if (getDepartment) {
            return res.json({
                error: false,
                success: true,
                message: `Lấy dữ liệu phòng ban ${_id} thành công!`
            })
        }
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Lấy dữ liệu phòng ban không thành công!'
        })
    }
}
export const updateDepartmentById = async (req, res) => {
    try {
        const checkAccount = await accountModel.findById(req.account_id)
        if (checkAccount.vai_tro === 'USER') {
            return res.json({
                error: true,
                success: false,
                message: 'Quyền cập nhật chỉ dành cho ADMIN!'
            })
        }
        const {
            _id,
            department_name,
            manager_id
        } = req.body
        const updateDepartment = await departmentModel.updateOne(
            { _id },
            { department_name, manager_id }
        )
        return res.json({
            error: false,
            success: true,
            message: "Cập nhật phòng ban thành công!"
        })
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Lỗi cập nhật phòng ban !'
        })
    }
}