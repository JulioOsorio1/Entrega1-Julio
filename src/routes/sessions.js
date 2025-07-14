
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        console.log(req.body); 
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ error: error.message });
    }
});


router.post('/login',
    passport.authenticate('login', { session: false }),
    (req, res) => {
        console.log(req.body)
        const user = req.user;
        const token = jwt.sign({ id: user._id, role: user.role }, 'secretJWT', { expiresIn: '1h' });
        res.json({ token });
    }
);


router.get('/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            user: {
                id: req.user._id,
                email: req.user.email,
                name: `${req.user.first_name} ${req.user.last_name}`,
                role: req.user.role
            }
        });
    }
);

export default router;
