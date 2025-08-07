
import express from 'express';
import passport, { session } from 'passport';
import jwt from 'jsonwebtoken';
import { authorizeRoles } from '../middlewares/authorizationMiddleware';



app.use(authorizeRoles);
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

function userDTO(user) {
    return {
        id: user._id,
        email: user.email,
        role: user.role,
    };
}


router.get('/admin/dashboard',
    passport.authenticate('jwt', { session: false }),
    authorizeRoles(['admin']), 
    (req, res) => {
        res.json({ message: 'Acceso al panel de administrador' });
    }
);

router.get('/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            user: userDTO(req.user)
        });
    }
);



export default router;
