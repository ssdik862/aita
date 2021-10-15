// packages
import shortid from 'shortid';
// services
import UserApiService from "../services/UserApiService.js";
// helpers
import getInviteCode from '../helpers/createInviteCode.js';
// models
import User from '../models/users.js';

class ApiUserController {
     
    async generateInviteCode(req, res) {
        try {
            const { id } = req.params;
            const code = shortid.generate();
            let user = await UserApiService.getOne(id);
            user = await UserApiService.bindCodeToUser(user, code);
            const svgInviteCode = getInviteCode(code);
            
            return res.status(200).send(`<p>name: ${user.name}</p>${svgInviteCode}`);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    async checkInviteCode(req, res) {
        try {
            const userCode = req.params.code;
            const user = await UserApiService.checkInviteCode(userCode);

            return res.status(200).json(user);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    async create(req, res) {
        try {
            const user = await UserApiService.create(req.body);

            return res.status(200).json(user);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };
    
    async getAll(req, res) {
        try {
            const users = await UserApiService.getAll();

            return res.status(200).json(users);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    async getOne(req, res) {
        try {
            const user = await UserApiService.getOne(req.params.id);

            return res.status(200).json(user);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    async update(req, res) {
        try {
            const updateUser = await UserApiService.update(req.body);

            return res.status(200).json(updateUser);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    async delete(req, res) {
        try {
            const user = await UserApiService.delete(req.params.id);

            return res.status(200).json(user);
        } catch (error) {
            ApiUserController.handleError(res, error)
        }
    };

    static handleError = (res, error) => res.status(500).send(error.message);

}

export default new ApiUserController();