
class UserRepository {
    constructor(userDao) {
        this.userDao = userDao;
    }
    async getUserById(id) {
        return await this.userDao.findById(id);
    }
    async getUserByEmail(email) {
        return await this.userDao.findByEmail(email);
    }
    async getAllUsers() {
        return await this.userDao.findAll();
    }
    async addUser(userData) {
        return await this.userDao.save(userData);
    }
    async updateUser(id, updateData) {
        return await this.userDao.update(id, updateData);
    }
    async removeUser(id) {
        return await this.userDao.delete(id);
    }
}

export default UserRepository;
