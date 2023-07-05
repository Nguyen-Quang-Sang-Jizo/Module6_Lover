import {Router} from "express";
import TypeController from "../controllers/typeController";

const typeRouter = Router()
typeRouter.get('/', TypeController.getType);

export default typeRouter;
