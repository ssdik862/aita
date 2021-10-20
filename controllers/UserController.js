// helpers
import createPath from '../helpers/createPath.js';
// services
import UserService from '../services/UserService.js';
// modules
import GeneralController from './GeneralController.js';

class UserController extends GeneralController {

    async getArrivedUsers(req, res) {
        try {
            const users = await UserService.getArrivedUsers();

            return res.render(createPath('map'), { users });
        } catch (error) {
            super.handleError(res, error);
        }
    };

    async getBoardingUser(req, res) {
        try {
            const user = await UserService.getBoardingUser();

            return res.render(createPath('boarding'), { user });
        } catch (error) {
            super.handleError(res, error);
        }
    };

}

export default new UserController();