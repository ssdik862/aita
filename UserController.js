import User from './models/users.js'
import UserService from './services/UserService.js';

class UserController {
     
    static handleError = (res, error) => res.status(500).send(error.message);

    async create(req, res) {
        try {
            const user = await UserService.create(req.body);
            return res.json(user);
        } catch (error) {
            UserController.handleError(res, error)
        }
    };
    
    async getAll(req, res) {
        try {
            const users = await UserService.getAll();
            return res.json(users);
        } catch (error) {
            UserController.handleError(res, error)
        }
    };

    async getOne(req, res) {
        try {
            const user = await UserService.getOne(req.params.id);
            return res.json(user);
        } catch (error) {
            UserController.handleError(res, error)
        }
    };

    async update(req, res) {
        try {
            const updateUser = await UserService.update(req.body);
            return res.json(updateUser);
        } catch (error) {
            UserController.handleError(res, error)
        }
    };

    async delete(req, res) {
        try {
            const user = await UserService.delete(req.params.id);
            return res.json(user);
        } catch (error) {
            UserController.handleError(res, error)
        }
    };

}

export default new UserController();