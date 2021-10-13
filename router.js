import Router from 'express';
import UserController from './UserController.js';

const router = new Router();

router.post('/users', UserController.create);   // create user
router.get('/users/', UserController.getAll);          // get all users
router.get('/users/:id', UserController.getOne);       // get user by id
router.put('/users', UserController.update);           // update user
router.delete('/users/:id', UserController.delete);    // delete user

export default router;