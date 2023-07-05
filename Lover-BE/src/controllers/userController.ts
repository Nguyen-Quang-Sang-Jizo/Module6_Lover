import userService from "../service/userService";
require('dotenv').config();
import {Request, Response} from "express";
import otpService from "../service/OtpService";
const mailer = require('nodemailer');

class UserController {
    signup = async (req: Request, res: Response) => {
        try {
            let checkMail = await userService.checkMail(req.body.email);
            if(checkMail == true){
            let check = await userService.loginCheck({username:req.body.username})
            if (check == "User is not exist") {
                let user = {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                }
               let checkOtp = await otpService.checkOtp(req.body.otpValue, req.body.email)
                if(checkOtp == false) {
                let newUser = await userService.save(user);
                res.status(201).json({
                    message: 'dang ky thanh công',
                    success: true,
                    data: newUser
                });
             }else if(checkOtp == true){
                res.status(401).json({
                    message: 'sai otp',
                    success: false,
             });
            }

            }
        }else if(checkMail == false){
            res.status(401).json({
                message: 'email da duoc dang ky o tai khoan khac',
                success: false,
         });
        }
        } catch (e) {
            res.status(401).json({
                message: 'trung tai khoan',
                success: false
            })
        }
    }
    login = async (req: Request, res: Response) => {
        try {
            let payload = await userService.loginCheck(req.body)
            if (payload === "User is not exist") {
                res.status(401).json({
                    data: payload
                });
            } else if (payload === "Password is wrong") {
                res.status(401).json({
                    data: payload
                });
            } else if (typeof payload !== "string" && payload?.isLocked) {
                    res.status(401).json({
                        mess: 'tài khoản đã bị khóa'
                    });
                } else {
                    res.status(200).json({
                        data: payload['token']
                    });
            }

        } catch (e) {
            res.status(400).json({
                message: 'error in login',
                success: false
            })
        }

    }
    allUser = async (req: Request, res: Response) => {
        const query = req.query
        let users = await userService.all(query);
        res.status(200).json({
            data: users
        })
    }
    showUser = async (req: Request, res: Response) => {
        let userId = req.params.id;
        let user = await userService.findOne(userId)
        res.status(200).json({
            data: user
        })
    }
    updateToProvider = async (req: Request, res: Response) => {
        try {
          let userId = req.params.id;
          let newRole = await userService.updateRole(userId);
          res.status(200).json(newRole);
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      

    lockUser = async (req: Request, res: Response) => {
        let userId = req.params.id
        let isLock = await userService.lock(userId)
        res.status(200).json({
            message: 'locked',
            data: isLock
        })
    }
    openUser = async (req: Request, res: Response) => {
        let userId = req.params.id
        let isOpen = await userService.open(userId)
        res.status(200).json({
            message: 'opened',
            data: isOpen
        })
    }
    editUser = async (req: Request, res: Response) => {
        let user = req.body;
        let id = req.params.id;
        let newUser = await userService.update(id, user);
        res.status(200).json({
            data: newUser,
        });
    };

    delete = async (req: Request, res: Response) => {
        await userService.delete(req.params.id)
        res.status(200).json('delete user success')
    }
    searchUsername = async (req: Request, res: Response) => {
        try {
            let username = req.params.name;
            let user = await userService.adminSearchUsername(username);
            res.status(200).json(user);
        } catch (e) {
            res.status(400).json({
                message: 'error in searchUsername',
                success: false
            })
        }
    }
    allBooking = async (req: Request, res: Response) => {
        let all = await userService.allBooking(req)
        res.status(200).json({
            data: all
        })
    }
    detailBooking = async (req: Request, res: Response) => {
        let id = req.params.id
        let one = await userService.detailBooking(id,req)
        res.status(200).json({
            data: one
        })
    }
}
export default new UserController()
