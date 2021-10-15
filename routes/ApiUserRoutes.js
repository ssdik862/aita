import Router from 'express';
import ApiUserController from '../controllers/ApiUserController.js';

const ApiUserRoutes = new Router();

// Generate boarding pass image for user
ApiUserRoutes.post('/api/users/generateInviteCode/:id', ApiUserController.generateInviteCode);
// Check invitation (invite code) is valid
ApiUserRoutes.post('/api/users/checkInviteCode/:code', ApiUserController.checkInviteCode);


// Add New User
ApiUserRoutes.post('/api/users', ApiUserController.create);
// Get All Users
ApiUserRoutes.get('/api/users/', ApiUserController.getAll);
// Get User by ID
ApiUserRoutes.get('/api/users/:id', ApiUserController.getOne);
// Update User
ApiUserRoutes.put('/api/users', ApiUserController.update);
// Delete User by ID
ApiUserRoutes.delete('/api/users/:id', ApiUserController.delete);


// Generate boarding pass image for user buy Get 
ApiUserRoutes.get('/api/users/generateInviteCode/:id', ApiUserController.generateInviteCode);
// Check invitation (invite code) is valid by Get
ApiUserRoutes.get('/api/users/checkInviteCode/:code', ApiUserController.checkInviteCode);


export default ApiUserRoutes;