

import { resetPassword } from '../services/authService.js';

export async function handleResetPassword(req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const result = await resetPassword(token, newPassword);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
