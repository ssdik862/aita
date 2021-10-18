// models
import User from "../db/models/users.js";

class UserService {

    async getArrivedUsers() {
        const users = await User.find({ accessCode : { $ne : null }, isCodeValid : false }).sort({ updatedAt: -1 });

        return users;
    };

    async getBoardingUser() {
        const user = await User.findOne({ accessCode : { $ne : null }, isCodeValid : false }).sort({ updatedAt: -1 });

        return user;
    };

};

export default new UserService();