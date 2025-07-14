
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js';
import { createHash, isValidPassword } from '../utils/hash.js';


passport.use('register', new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
            const user = await User.findOne({ email });

            if (user) return done(null, false, { message: 'este usuario ya existe' });

            const hashedPassword = createHash(password);
            
            const newUser = await User.create({ first_name, last_name, email, age, password: hashedPassword });
            return done(null, newUser);
        } catch (err) {
            return done(err);
        }
    }
));

//---

passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });

            if (!user || !isValidPassword(user, password)) {
                return done(null, false, { message: 'Invalid credentials' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

//----

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secretJWT'
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (!user) return done(null, false);

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

export default passport;