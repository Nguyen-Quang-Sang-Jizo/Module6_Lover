import {Router} from 'express'
import userController from "../controllers/userController";
const passport = require('passport');
const hasPermissionsUser = require('../middleware/checkRoleUser')
const userRouter = Router()

userRouter.post('/register', userController.signup);
userRouter.get('/',   passport.authenticate('jwt', { session: false, failWithError: true }),
    userController.allUser);
userRouter.get('/all-booking', passport.authenticate('jwt', {session: false, failWithError: true}),
    (req, res, next) => {
        hasPermissionsUser(req, res, next,);
    }, userController.allBooking)
userRouter.get('/detail-booking/:id', passport.authenticate('jwt', {session: false, failWithError: true}),
    (req, res, next) => {
        hasPermissionsUser(req, res, next,);
    }, userController.detailBooking)
userRouter.post('/login',userController.login)
userRouter.get('/:id',userController.showUser);
userRouter.put('/:id',userController.editUser);
userRouter.delete('/:id',userController.delete);
userRouter.get('/:name',userController.searchUsername);

export default userRouter
