
import express from 'express';
import User from '../models/user.js';
import { createHash } from '../utils/hash.js';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorizationMiddleware.js';


const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().populate('cart');
    res.json(users);
});

router.get('/current', passport.authenticate('current', { session: false }),
    (req, res) => {
        authorizeRoles('JEFE')
        const user = req.user;
        res.json({
            user: {
                id: user._id,
                email: user.email,
                name: `${user.first_name}${user.last_name}`,
                role: user.role
            }
        })
    })


router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});


router.post('/register', async (req, res) => {
    try {
        console.log('datos recibidos:', req.body);
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { password, ...rest } = req.body;
    const updateData = { ...rest };
    if (password) updateData.password = createHash(password);
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(user);
});



router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

export default router;
