// packages
import shortid from 'shortid';
// services
import UserService from "../services/UserService.js";
// helpers
import getInviteCode from '../helpers/createInviteCode.js';
// models
import User from '../models/users.js';

class ApiUserController {
     
    async generateInviteCode(req, res) {
        try {
            const { id } = req.params;
            const code = shortid.generate();
            let user = await UserService.getOne(id);
            user = await UserService.bindCodeToUser(user, code);
            const svgInviteCode = getInviteCode(code);
            
            return res.send(`<p>name: ${user.name}</p>${svgInviteCode}`);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    async checkInviteCode(req, res) {
        try {
            const userCode = req.params.code;
            console.log('usercode', userCode);
            const user = await UserService.checkInviteCode(userCode);

            return res.json(user);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    async create(req, res) {
        try {
            const user = await UserService.create(req.body);

            return res.json(user);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };
    
    async getAll(req, res) {
        try {
            const users = await UserService.getAll();

            return res.json(users);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    async getOne(req, res) {
        try {
            const user = await UserService.getOne(req.params.id);

            return res.json(user);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    async update(req, res) {
        try {
            const updateUser = await UserService.update(req.body);

            return res.json(updateUser);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    async delete(req, res) {
        try {
            const user = await UserService.delete(req.params.id);

            return res.json(user);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    static handleError = (res, error) => res.status(500).send(error.message);

}

export default new ApiUserController();