
import bcrypt from 'bcrypt';
import User from '../models/user.js';

export async function resetPassword(token, newPassword) {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new Error('Token inválido o expirado');
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
        throw new Error('La nueva contraseña no puede ser igual a la anterior');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: 'Contraseña restablecida exitosamente' };
}
