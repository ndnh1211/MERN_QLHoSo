export const checkAccount = async (req, res, next) => {
    const checkAccount = await accountModel.findById(req.account_id)
    if (checkAccount.vai_tro === 'USER') {
        return res.json({
            error: true,
            success: false,
            message: 'Quyền Cập nhật chỉ dành cho ADMIN!!'
        })
    }
    next();
}