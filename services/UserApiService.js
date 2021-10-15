import User from "../models/users.js";

class UserApiService {

    async bindCodeToUser(user, code) {
        if (!(user instanceof User)) {
            throw new Error('invalid user input')
        };

        user.accessCode = code;
        user.isCodeValid = true;
        user = await user.save();

        return user;
        
    };

    async checkInviteCode(userCode) {
        if (!userCode) {
            throw new Error('Code not input')
        };

        const user = await User.findOne( { accessCode : userCode } );
        if (!(user instanceof User)) {
            throw new Error('User not found')
        };

        let reply = {
            isInvitationValid : user.isCodeValid,
            userName : user.name,
            userId : user.id
        };

        user.isCodeValid = false;
        await user.save();

        return reply;
    };

    async create(user) {
        const createdUser = await User.create(user);
        return createdUser;
    };
    
    async getAll() {
        const users = await User.find();
        return users;
    };

    async getOne(id) {
        if (!id) {
            throw new Error('ID not input')
        };
        const user = await User.findById(id);
        return user;
    };
    
    async update(user) {
        if (!user._id) {
            throw new Error('ID not input')
        };
        const updateUser = await User.findByIdAndUpdate(user._id, user, {new: true});

        return updateUser;
    };

    async delete(id) {
        if (!id) {
            throw new Error('ID not input')
        };
        const user = await User.findByIdAndDelete(id);

        return user;
    };

};

export default new UserApiService();