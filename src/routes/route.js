import express from 'express';
import userController from '../controllers/userController';

const route = express.Router();

route.post('/api/v1/auth/signup', userController.signup);
route.get('/api/v1/auth/login', userController.login);

export default route;
