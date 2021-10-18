import Router from 'express';
import ApiUserController from '../controllers/ApiUserController.js';

const ApiUserRoutes = new Router();

/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - distance
 *         - hours
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         distance:
 *           type: integer
 *           description: The user flying distance
 *         hours:
 *           type: integer
 *           description: The user flying hours
 *         accessCode:
 *           type: string
 *           description: The user invite code
 *         isCodeValid:
 *           type: boolean
 *           description: Check user invite code used
 *         createdAt:
 *           type: date
 *           description: user created time
 *         updatedAt:
 *           type: date
 *           description: user updated time
 *       example:
 *         id: 61631ab5794e624576dce896
 *         name: Ivan
 *         distance: 2345
 *         hours: 23
 *   parameters:
 *     userIdParam:
 *       name: id
 *       in: path
 *       description: User id
 *       required: true
 *       schema:
 *         type: string
 */

/**
 * @swagger
  * tags:
  *   - name: Invitation
  *     description: The users invitation managing API
  *   - name: Users
  *     description: The users managing API
  */

/**
 * @swagger
 * /api/users/generateInviteCode/{id}:
 *   post:
 *     summary: Generate boarding pass invitation for user by id
 *     tags: [Invitation]
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     responses:
 *       200:
 *         description: invite code was generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                 code:
 *                   type: string
 *                 svgCode:
 *                   type: string
 *                   format: binary
 *       404:
 *         description: user is not found
 *       500:
 *         description: some server error
 */
 ApiUserRoutes.post('/api/users/generateInviteCode/:id', ApiUserController.generateInviteCode);

 /**
  * @swagger
  * /api/users/checkInviteCode/{code}:
  *   post:
  *     summary: Check invitation (invite code) is valid
  *     tags: [Invitation]
  *     parameters:
  *       - in: path
  *         name: code
  *         schema:
  *           type: string
  *         required: true
  *         description: User invite code
  *     responses:
  *       200:
  *         description: invite code was chacked
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 isInvitationValid:
  *                   type: boolean
  *                 userName:
  *                   type: string
  *                 userId:
  *                   type: string
  *       404:
  *         description: user is not found
  *       500:
  *         description: some server error
  */
 ApiUserRoutes.post('/api/users/checkInviteCode/:code', ApiUserController.checkInviteCode);
 
 /**
  * @swagger
  * /api/users:
  *   get:
  *     summary: Returns the list of all the users
  *     tags: [Users]
  *     responses:
  *       200:
  *         description: The list of the users
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/User'
  */
 ApiUserRoutes.get('/api/users/', ApiUserController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     responses:
 *       200:
 *         description: user found by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user is not found
 *       500:
 *         description: some server error
 */
 ApiUserRoutes.get('/api/users/:id', ApiUserController.getOne);


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: some server error
 */
ApiUserRoutes.post('/api/users', ApiUserController.create);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Update user by id
 *    tags: [Users]
 *    parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: user was not found
 *      500:
 *        description: some server error
 */
ApiUserRoutes.put('/api/users/:id', ApiUserController.update);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Delete user by id
 *    tags: [Users]
 *    parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *    responses:
 *      200:
 *        description: user was deleted
 *        content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties: 
 *                id:
 *                  type: string
 *      404:
 *        description: user was not found
 *      500:
 *        description: some server error
 */
ApiUserRoutes.delete('/api/users/:id', ApiUserController.delete);


export default ApiUserRoutes;