// models
import User from "../models/users.js";

class UserService {

    async getArrivedUsers() {

        const users = await User.find({ accessCode : { $ne : null }, isCodeValid : false }).sort({ updatedAt: -1 });

        if (!users.length) {
            throw new Error('Users not found')
        };

        return users;
    };

    async getBoardingUser() {

        const user = await User.findOne({ accessCode : { $ne : null }, isCodeValid : false }).sort({ updatedAt: -1 });

        if (!user) {
            throw new Error('User not found')
        };

        return user;
    };

};

export default new UserService();