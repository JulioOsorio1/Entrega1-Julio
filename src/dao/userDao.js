
import User from '../models/user.js';

class UserDao {
    async findById(id) {
        return await User.findById(id).populate('cart').lean();
    }
    async findByEmail(email) {
        return await User.findOne({ email }).lean();
    }
    async findAll() {
        return await User.find().lean();
    }
    async save(userData) {
        const user = new User(userData);
        return await user.save();
    }
    async update(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }
    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
};

class UserDTO {
    constructor(user){
        this.name = user.name;
        this.email= user.email;
        this.age= user.age;
        this.password = user.password;
        this.role = user.role;
        this.cart = user.cart;
    }
}

export default {UserDTO, UserDao}
