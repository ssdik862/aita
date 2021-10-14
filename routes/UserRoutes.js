import Router from 'express';
import UserController from '../UserController.js';

const UserRoutes = new Router();

// Show statistics about each arrived user
UserRoutes.get('/map', UserController.getAll);
// show last arrived user’s statistics in realtime
UserRoutes.get('/boarding', UserController.getOne);




export default UserRoutes;