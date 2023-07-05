const hasPermissionsProvider = (req, res, next) => {
    const role = req.user?.role?.id
    if (role !== 3) {
        return res.status(201).json({
            message: "Ban khong co quyen truy cap"
        })
    }
    next()
};

module.exports = hasPermissionsProvider