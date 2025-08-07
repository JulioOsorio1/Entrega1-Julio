import bcrypt from 'bcrypt';

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.saltRounds = 10;
    }

    async registerUser(userData) {
        const existingUser = await this.userRepository.getUserByEmail(userData.email);
        if (existingUser) throw new Error('Email ya existente');
        userData.password = await bcrypt.hash(userData.password, this.saltRounds);
        return await this.userRepository.addUser(userData);
    }

    async loginUser(email, password) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) throw new Error('Usuario no encontrado');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error('Contraseña incorrecta');
        return user; 
    }

    async getUserProfile(id) {
        const user = await this.userRepository.getUserById(id);
        if (!user) throw new Error('usuario no encontrado');
        return user;
    }

    async updateUser(id, updateData) {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, this.saltRounds);
        }

        const updatedUser = await this.userRepository.updateUser(id, updateData);
        if (!updatedUser) throw new Error('no se puede actualizar');

        return updatedUser;
    }

    async deleteUser(id) {
        const deleted = await this.userRepository.deleteUser(id);
        if (!deleted) throw new Error('No se pudo eliminar el usuario');
        return deleted;
    }
}

export default UserService;
