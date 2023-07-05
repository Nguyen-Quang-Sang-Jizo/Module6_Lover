
import userService from "../service/userService";

const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');


const opts = {
    jwtFromRequest: undefined,
    secretOrKey: undefined
}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_OR_KEY



module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        userService.findOne(jwt_payload.idUser).then((user) => {
            if (user) {
                return done(null, user)
            }
            return done(null,false)
        })
            .catch((e)=>console.log(e))
    }))

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}
