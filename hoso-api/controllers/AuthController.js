import accountModel from "../models/AccountModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const { first_name, last_name, email, password, ngaySinh, phoneNumber } = req.body
    if (!first_name) {
        return res.json({
            error: true,
            success: false,
            message: "Chưa nhập tên "
        })
    }
    if (!last_name) {
        return res.json({
            error: true,
            success: false,
            message: "Chưa nhập họ"
        })
    }
    if (!password) {
        return res.json({
            error: true,
            success: false,
            message: "Chưa nhập password"
        })
    }
    if (!email) {
        return res.json({
            error: true,
            success: false,
            message: "Chưa nhập email"
        })
    }
    if (!ngaySinh) {
        return res.json({
            error: true,
            success: false,
            message: "Chưa chọn ngày sinh!"
        })
    }
    if (!phoneNumber) {
        return res.json({
            error: true,
            success: false,
            message: 'Chưa nhập số điện thoại!'
        })
    }
    const account = await accountModel.find({ email })
    if (account.length > 0) {
        return res.json({
            error: true,
            success: false,
            message: "Email đã đăng ký"
        })
    }
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds)

    const createAccount = await accountModel.create({
        email: email,
        password: hashPassword,
        first_name: first_name,
        last_name,
        vai_tro: 'USER',
        ngaySinh,
        phoneNumber
    })
    const saveAccount = await createAccount.save()
    return res.json({
        error: false,
        success: true,
        data: saveAccount,
        message: "Đăng ký thành công!"
    })
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.json({
            error: true,
            success: false,
            message: "Chưa nhập email"
        })
    }
    if (!password) {
        return res.json({
            error: true,
            success: false,
            message: "Chưa nhập password"
        })
    }
    const checkAccount = await accountModel.findOne({ email }) //Kiểm tra xem email đã được user nào đăng ký hay chưa
    if (!checkAccount) {
        return res.json({
            error: true,
            success: false,
            message: "Tài khoản không tồn tại"
        })
    }
    if (bcrypt.compareSync(password, checkAccount.password)) { //So sánh mật khẩu nhập với mật khẩu mã hóa
        //Tạo token
        const tokenData = {
            account_id: checkAccount._id,
            first_name: checkAccount.first_name,
            last_name: checkAccount.last_name,
            ngaySinh: checkAccount.ngaySinh,
            phoneNumber: checkAccount.phoneNumber,
            email: checkAccount.email,
        }
        const token = await jwt.sign(tokenData, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' })
        const cookieOptions = {
            secure: true,
            httpOnly: true,
        };
        //Lưu token vào cookie
        return res.cookie('token', token, cookieOptions).json({
            error: false,
            success: true,
            data: checkAccount,
            message: "Đăng nhập thành công !"
        })
    } else {
        return res.json({
            error: true,
            success: false,
            message: "Sai mật khẩu !"
        })
    }
}

export const verifyAccount = async (req, res) => {
    // console.log(req.cookies);
    const account = await accountModel.findById(req.account_id).select('-password')
    if (account) {
        return res.json({
            error: false,
            success: true,
            data: account,
            message: "Xác thực thành công !"
        })
    } else { //Không bao giờ có trường hợp else vì đã bị chặn ở middleware
        return res.json({
            error: true,
            success: false,
            message: "Xác thực thất bại !"
        })
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token') //Xóa token ở trình duyệt
    return res.json({
        error: false,
        success: true,
        message: "Đăng xuất thành công !"
    })
}
export const updateProfile = async (req, res) => {
    try {
        const checkAccount = await accountModel.findById(req.account_id)
        if (!checkAccount) {
            return res.json({
                error: true,
                success: false,
                message: 'Không tồn tại người dùng!'
            })
        }
        const { first_name, last_name, ngaySinh, phoneNumber } = req.body
        if (!first_name || !last_name || !ngaySinh || !phoneNumber) {
            return res.json({
                error: true,
                success: false,
                message: 'Chưa điền đủ thông tin !!'
            })
        }
        const profile = await accountModel.updateOne({ _id: req.account_id }, { first_name, last_name, ngaySinh, phoneNumber })
        return res.json({
            error: false,
            success: true,
            message: 'Cập nhật dữ liệu người dùng thành công!'
        })
    } catch (error) {
        return res.json({
            error: true,
            success: false,
            message: 'Cập nhật dữ liệu không thành công!'
        })
    }
}