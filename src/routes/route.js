import express from 'express';
import userController from '../controllers/userController';
import userProfile from '../controllers/userProfile';
import auth from '../middleware/checkAuth';
import isAdmin from '../middleware/isAdmin';
import product from '../controllers/products';
// import imageUploader from '../middleware/imageUploader';

const route = express.Router();

// registration
route.post('/api/v1/auth/signup', userController.signup);
route.get('/api/v1/auth/login', userController.login);

// profile
route.get('/api/v1/getProfile', auth.auth, userProfile.getProfile);
route.patch('/api/v1/updateProfile', auth.auth, userProfile.updateProfile);

// Product
route.post('/api/v1/addProduct', auth.auth, isAdmin, product.addProduct);

export default route;
