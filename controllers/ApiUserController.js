// packages
import { nanoid } from 'nanoid';
const idLength = 8;
// services
import UserApiService from "../services/UserApiService.js";
// helpers
import getInviteCode from '../helpers/createInviteCode.js';
// modules
import GeneralController from './GeneralController.js';

class ApiUserController extends GeneralController{
     
    async generateInviteCode(req, res) {
        try {
            const { id } = req.params;
            const code = nanoid(idLength);
            let user = await UserApiService.getOne(id);
            user = await UserApiService.bindCodeToUser(user, code);
            const svgInviteCode = getInviteCode(code);
            
            // return res.status(200).send(`<p>name: ${user.name}</p>${svgInviteCode}`);
            return res.status(200).json({
                userName: user.name,
                code: user.accessCode,
                svgCode: svgInviteCode
            });
        } catch (error) {
            super.handleError(res, error);
        }
    };

    async checkInviteCode(req, res) {
        try {
            const userCode = req.params.code;
            const user = await UserApiService.checkInviteCode(userCode);

            return res.status(200).json(user);
        } catch (error) {
            super.handleError(res, error);
        }
    };

    async create(req, res) {
        try {
            const user = await UserApiService.create(req.body);

            return res.status(200).json(user);
        } catch (error) {
            super.handleError(res, error);
        }
    };
    
    async getAll(req, res) {
        try {
            const users = await UserApiService.getAll();

            return res.status(200).json(users);
        } catch (error) {
            super.handleError(res, error);
        }
    };

    async getOne(req, res) {
        try {
            const user = await UserApiService.getOne(req.params.id);
            if (!user) {
                return res.sendStatus(404)
            };

            return res.status(200).json(user);
        } catch (error) {
            super.handleError(res, error);
        }
    };

    async update(req, res) {
        const userId = req.params.id;
        try {
            const updateUser = await UserApiService.update(userId, req.body);
            if (!updateUser) {
                return res.sendStatus(404)
            };

            return res.status(200).json(updateUser);
        } catch (error) {
            super.handleError(res, error);
        }
    };

    async delete(req, res) {
        const userId = req.params.id;
        try {
            const user = await UserApiService.delete(userId);
            if (!user) {
                return res.sendStatus(404)
            };

            return res.status(200).json({id : userId});
        } catch (error) {
            super.handleError(res, error);
        }
    };

}

export default new ApiUserController();