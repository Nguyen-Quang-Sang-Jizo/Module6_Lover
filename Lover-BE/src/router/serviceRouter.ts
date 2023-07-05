import {Router} from "express";
import ServiceController from "../controllers/serviceController";
const passport = require('passport');
const hasPermissionsUser = require('../middleware/checkRoleUser')

const serviceRouter = Router()
serviceRouter.get('/', ServiceController.allService);
serviceRouter.get('/basic', ServiceController.basicService);
serviceRouter.get('/free', ServiceController.freeService);
serviceRouter.get('/more', ServiceController.moreService);
serviceRouter.get('/:id', ServiceController.getService);

export default serviceRouter;