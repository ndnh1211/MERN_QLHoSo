import jwt from 'jsonwebtoken'

export const authToken = async (req, res, next) => {
    try {
        // lấy token từ trình duyệt 
        const token = req?.cookies?.token // ?. Có nghĩa là nếu mà nó không có thì nó sẽ là undefind hoặc null rồi chạy tiếp, còn không có dấu ? thì nó sẽ ngắt backend và xuất ra lỗi
        if (!token) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Chưa đăng nhập kìa !!!"
            })
        }
        //Xác thực token
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    success: false,
                    message: "Token không hợp lệ !"
                })
            } else if (decoded) {
                req.account_id = decoded.account_id // Lưu account_id (_id) vào request.account_id
                next()
            }
        })
    } catch (error) {
        console.log('Error in verify token:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}