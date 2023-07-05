import {Router} from "express";
import evaluateController from "../controllers/evaluateController";

const evaluateRouter = Router()
evaluateRouter.post('/:id', evaluateController.addEvaluate)
export default evaluateRouter