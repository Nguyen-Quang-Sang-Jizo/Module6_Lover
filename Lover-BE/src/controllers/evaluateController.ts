import {Request, Response} from "express";
import evaluateService from "../service/evaluateService";
const jwt = require('jsonwebtoken')


class EvaluateController {
    private evaluateService
    constructor() {
        this.evaluateService = evaluateService
    }
    addEvaluate =async (req: Request, res: Response) => {
        let idUser = req.params.id
        let token = req.headers.authorization.split(' ')[1];
           const decodedToken = jwt.decode(token);
           let evaluate = req.body
           let newEvaluate = await evaluateService.addComment(evaluate, decodedToken.idUser, idUser) 
           res.status(200).json({
            success: true,
            data: newEvaluate
        })
    }
}
export default new EvaluateController();