import {Router} from "express";
import ServiceProviderController from "../controllers/ServiceProviderController";
const passport = require('passport');
const hasPermissionsProvider = require('../middleware/CheckRoleProvider')
const ServiceProviderRouter = Router()
ServiceProviderRouter.get('/type/:id', ServiceProviderController.find)
ServiceProviderRouter.get('/:id', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },ServiceProviderController.getOne)
export default ServiceProviderRouter