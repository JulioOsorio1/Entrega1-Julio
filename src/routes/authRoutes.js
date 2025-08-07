

import express from 'express';
import crypto from 'crypto';
import User from '../models/user.js';
import { sendResetEmail } from '../mailer.js';

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000; // una hora
    await user.save();
    await sendResetEmail(user.email, token);
    res.json({ message: 'Correo enviado con instrucciones' });
});

router.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({
        resetToken: token,
        resetTokenExpires: { $gt: Date.now() }
    });
    if (!user) {
        return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    res.json({ message: 'Token válido', email: user.email });
});


router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
        resetToken: token,
        resetTokenExpires: { $gt: Date.now() }
    });
    if (!user) {
        return res.status(400).json({ message: 'Token inválido o expirado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente' });
});