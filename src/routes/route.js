import express from 'express';
import userController from '../controllers/user';
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
route.patch('/api/v1/updateProduct', auth.auth, isAdmin, product.updateProduct);
route.get('/api/v1/viewAllProducts', auth.auth, product.viewAllProducts);
route.delete('/api/v1/deleteProduct', auth.auth, isAdmin, product.deleteProduct);
route.get('/api/v1/viewAllProducts', auth.auth, product.viewAllProducts);
route.get('/api/v1/viewOneProduct', auth.auth, product.viewOneProduct);

export default route;
