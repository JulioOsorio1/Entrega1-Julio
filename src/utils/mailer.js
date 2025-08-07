
import nodemailer from 'nodemailer';
import express from 'express';

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'julio@julio',
        pass: 'tucontraseña'
    }
});

export async function sendResetEmail(to, token) {
    const resetUrl = `http://julio.com/reset-password/${token}`;

    await transporter.sendMail({
        to,
        from: 'no-reply@tuapp.com',
        subject: 'Restablecimiento de contraseña',
        html: `<p>Solicitio restablecer mi contraseña</p>
    <p><a href="${resetUrl}" style="padding: 10px 15px; background: #007bff; color: white; border-radius: 5px; text-decoration: none;">Restablecer contraseña</a></p>

    <p>Este enlace expirará en 60 minutos.</p>
    `
    });
};
export default nodemailer;