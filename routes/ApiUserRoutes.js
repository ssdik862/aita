import Router from 'express';
import ApiUserController from '../controllers/ApiUserController.js';

const ApiUserRoutes = new Router();

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


// Generate boarding pass image for user
ApiUserRoutes.post('/api/users/generateInviteCode/:id', ApiUserController.generateInviteCode);
ApiUserRoutes.get('/api/users/generateInviteCode/:id', ApiUserController.generateInviteCode);

// Check invitation (invite code) is valid
ApiUserRoutes.post('/api/users/checkInviteCode/:code', ApiUserController.checkInviteCode);
ApiUserRoutes.get('/api/users/checkInviteCode/:code', ApiUserController.checkInviteCode);


// app.get('/checkInviteCode/:code', async (req, res) => {

//     const userCode = req.params.code;

//     try {
//         const user = await User.findOne({accessCode : userCode});
//         // const arr = await Movie.find({ year: { $gte: 1980, $lte: 1989 } });
//         console.log('user', user);
//         if (user instanceof User) {
//             res.json({
//                 isInvitationValid : user.isCodeValid,
//                 userName : user.name,
//                 userId : user.id
//             });
//         };

//         res.json(user);

//     } catch (error) {
//         console.error(error);
//         res.send(`upsss`);
//     }

// });

export default ApiUserRoutes;