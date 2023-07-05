//
// const hasPermissionsProvider = (req, res, next) => {
//     const role = req.user?.role?.id
//     console.log("role cua user :",role)
//     if (role === 3) {
//         return res.status(201).json({
//             message: "Ban khong co quyen truy cap"
//         })
//     }
// };
//
// module.exports = hasPermissionsProvider
// const hasPermissionsUser = (req, res, next) => {
//     const role = req.user?.role?.id
//     console.log(role)
//     if (role !== 1) {
//         return res.status(201).json({
//             message: "Ban khong co quyen truy cap"
//         })
//     }
// };
//
//
// module.exports = hasPermissionsUser
// const hasPermissionsAdmin = (req, res, next) => {
//     const role = req.user?.role?.id
//     if (role !== 2) {
//         return res.status(403).json({
//             message: "bạn không có quyền truy cập"
//         })
//     }
//     next()
// };
//
//
// module.exports = hasPermissionsAdmin
//
