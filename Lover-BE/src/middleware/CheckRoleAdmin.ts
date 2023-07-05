const hasPermissionsAdmin = (req, res, next) => {
    const role = req.user?.role?.id
    if (role !== 2) {
        return res.status(403).json({
            message: "bạn không có quyền truy cập"
        })
    }
    next()
};


module.exports = hasPermissionsAdmin