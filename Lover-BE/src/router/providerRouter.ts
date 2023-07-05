import {Router} from "express";
import providerController from "../controllers/providerController";
const hasPermissionsProvider = require('../middleware/CheckRoleProvider')
const passport = require('passport');


const providerRouter = Router()

providerRouter.get('/', providerController.all)
providerRouter.get('/topProviders', providerController.getTopProviders)
providerRouter.get('/topSixProviders', providerController.getTopSixProviders)
providerRouter.get('/newlyJoinedProviders', providerController.getNewlyJoinedProviders)
providerRouter.post('/increaseCount/:id', providerController.increaseCounts)
providerRouter.put('/privateProvider/:id', providerController.privateProvider)
providerRouter.put('/publicProvider/:id', providerController.publicProvider)
providerRouter.put('/forRentProvider/:id', providerController.forRentProvider)

providerRouter.get('/providerDetail/:id', providerController.showOne)
providerRouter.post('/',passport.authenticate('jwt', { session: false, failWithError: true }), providerController.save)
providerRouter.put('/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.editProvider);
providerRouter.put('/privateProvider/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.privateProvider);
    providerRouter.get('/providerDetailByUser',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.showOneByIdUser);
providerRouter.put('/publicProvider/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.publicProvider);
providerRouter.put('/accept/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.acceptUser);
providerRouter.put('/reject/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.rejectUser);

export default providerRouter
