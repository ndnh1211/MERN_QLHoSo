import accountModel from "../models/AccountModel.js"

export const getAllAccount = async (req, res) => {
    try {
        const account = await accountModel.find().select('-password')
        if (account) {
            return res.json({
                error: false,
                success: true,
                data: account,
                message: 'lấy tất cả dữ liệu account thành công !!'
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            success: false,
            message: 'lỗi lấy dữ liệu tài khoản !!'
        })
    }
}
export const deleteAccountById = async (req, res) => {
    try {
        const { _id } = req.params;
        const checkAccount = await accountModel.findById(req.account_id)
        if (checkAccount.vai_tro === 'USER') {
            return res.json({
                error: true,
                success: false,
                message: 'Tính năng này chỉ sử dụng cho ADMIN!!'
            })
        }
        const deleteAccountById = await accountModel.deleteOne({ _id: _id })
        if (deleteAccountById) {
            return res.json({
                success: true,
                error: false,
                message: `Xóa tài khoản ${_id} thành công !!`
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            success: false,
            message: 'lỗi xóa tài khoản'
        })

    }
}
export const getAccountById = async (req, res) => {
    try {
        const { _id } = req.params
        const getAccount = await accountModel.findById(_id)
        if (getAccount) {
            return res.json({
                error: false,
                success: true,
                data: getAccount,
                message: `Lấy tài khoản người dùng ${_id} thành công!!`
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            success: false,
            message: 'Lấy tài khoản không thành công!!'
        })
    }
}

export const updateAccountById = async (req, res) => {
    try {
        const checkAccount = await accountModel.findById(req.account_id)
        if (checkAccount.vai_tro === 'USER') {
            return res.json({
                error: true,
                success: false,
                message: 'Bạn không có quyền chỉnh sửa tài khoản!!'
            })
        }
        const { _id, first_name, last_name } = req.body
        const updateAccount = await accountModel.updateOne({ _id: _id }, {
            first_name: first_name,
            last_name: last_name
        })
        return res.json({
            error: false,
            success: true,
            data: updateAccount,
            message: `Cập nhật dữ liệu người dùng ${_id} thành công!`
        })
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'lỗi cập nhật tài khoản!'
        })
    }
}
export const getAccountUser = async (req, res) => {
    try {
        const checkAccount = await accountModel.findById(req.account_id)
        if (checkAccount === 'USER') {
            return res.json({
                error: true,
                success: false,
                message: 'Tính năng chỉ sử dụng cho ADMIN!'
            })
        }
        const getAdmin = await accountModel.find({ vai_tro: 'USER' })
        return res.json({
            error: false,
            success: true,
            data: getAdmin,
            message: `Lấy dữ liệu người dùng thành công!`
        })
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Lấy người dùng không thành công!'
        })
    }
}
export const getAccountAdmin = async (req, res) => {
    try {
        const checkAccount = await accountModel.findById(req.account_id)
        if (checkAccount.vai_tro === 'USER') {
            return res.json({
                error: true,
                success: false,
                message: 'Tính năng chỉ sử dụng cho ADMIN!'
            })
        }
        const getAdmin = await accountModel.find({ vai_tro: 'ADMIN' })
        return res.json({
            error: false,
            success: true,
            data: getAdmin,
            message: `Lấy dữ liệu người dùng thành công!`
        })
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Lấy người dùng không thành công!'
        })
    }
}