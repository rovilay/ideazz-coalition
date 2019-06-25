import express from 'express';

import { userApiPrefix } from '../helpers/defaults';
import userController from '../controllers/User';

const userRoutes = express.Router();

userRoutes.post(`${userApiPrefix}/signup`, userController.createUser);

userRoutes.post(`${userApiPrefix}/signin`, userController.loginUser);

export default userRoutes;
