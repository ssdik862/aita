import Router from 'express';
import UserController from './UserController.js';

const router = new Router();

router.post('/api/users', UserController.create);   // create user
router.get('/api/users/', UserController.getAll);          // get all users
router.get('/api/users/:id', UserController.getOne);       // get user by id
router.put('/api/users', UserController.update);           // update user
router.delete('/api/users/:id', UserController.delete);    // delete user

export default router;