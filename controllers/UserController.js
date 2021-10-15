// helpers
import createPath from '../helpers/createPath.js';
// services
import UserService from '../services/UserService.js';

class UserController {
     
    async getArrivedUsers(req, res) {
        try {
            const users = await UserService.getArrivedUsers();

            return res.render(createPath('map'), { users });
        } catch (error) {
            UserController.handleError(res, error)
        }
    };

    async getBoardingUser(req, res) {
        try {
            const user = await UserService.getBoardingUser();

            return res.render(createPath('boarding'), { user });
        } catch (error) {
            UserController.handleError(res, error)
        }
    };

    static handleError = (res, error) => res.status(500).send(error.message);

}

export default new UserController();