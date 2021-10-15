import Router from 'express';
import UserController from '../controllers/UserController.js';

const UserRoutes = new Router();

// Show statistics about each arrived user
UserRoutes.get('/map', UserController.getArrivedUsers);

// show last arrived user’s statistics in realtime
UserRoutes.get('/boarding', UserController.getBoardingUser);


export default UserRoutes;