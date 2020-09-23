import express from 'express';
import userController from '../controllers/user';
import userProfile from '../controllers/userProfile';
import auth from '../middleware/checkAuth';
import isAdmin from '../middleware/isAdmin';
import product from '../controllers/products';
import isCustomer from '../middleware/isCustomer';
import loan from '../controllers/requests';
import seller from '../controllers/manager';
// import imageUploader from '../middleware/imageUploader';
import isSuperAdmin from '../middleware/isSuperAdmin';
import passport from '../config/passport';

const route = express.Router();

const { socialLogin, logout } = userController;

// registration
route.post('/api/v1/auth/signup', userController.signup);
route.post('/api/v1/auth/login', userController.login);

// social logins

route.get('/auth/login/socialLogin', (req, res) => {
  res.sendFile('socialLogin.html', { root: `${__dirname}/../templates/` });
});

// social logins - Gmail
route.get('/auth/login/google',passport.authenticate('google', { scope: ['profile', 'email']}),);
route.get('/auth/login/google/redirect', passport.authenticate('google'), socialLogin);

// instagram
route.get('/auth/login/instagram', passport.authenticate('instagram'), socialLogin);
route.get('/auth/login/instagram/redirect', passport.authenticate('instagram', { scope: ['user_profile', 'user_media']}, { failureRedirect: '/api/v1/auth/login'}), socialLogin);

// profile
route.get('/api/v1/getProfile', auth.auth, userProfile.getProfile);
route.patch('/api/v1/updateProfile', auth.auth, userProfile.updateProfile);

// user search
route.get('/api/v1/findUser', auth.auth, userProfile.findUser);

// Product
route.post('/api/v1/addProduct', auth.auth, isAdmin, product.addProduct);
route.patch('/api/v1/updateProduct', auth.auth, isAdmin, product.updateProduct);
route.get('/api/v1/viewAllProducts', auth.auth, product.viewAllProducts);
route.delete('/api/v1/deleteProduct', auth.auth, isAdmin, product.deleteProduct);
route.get('/api/v1/viewAllProducts', auth.auth, product.viewAllProducts);
route.get('/api/v1/viewOneProduct', auth.auth, product.viewOneProduct);

// request
route.post('/api/v1/requestLoan', auth.auth, loan.requestLoan);
route.get('/api/v1/myRequets', auth.auth, loan.myRequests);
route.get('/api/v1/findRequest', auth.auth, loan.findRequest);

// manager
route.get('/api/v1/AllRequests', auth.auth, isAdmin, seller.viewAllRequests);
route.patch('/api/v1/ApproveRequest', auth.auth, isAdmin, seller.ApproveRequest);
route.patch('/api/v1/RejectRequest', auth.auth, isAdmin, seller.RejectRequest);

// admin
route.get('/api/v1/findAll', auth.auth, isSuperAdmin, userProfile.findAllUser);
route.delete('/api/v1/deleteUser', auth.auth, isSuperAdmin, userProfile.deleteUser);
route.patch('/api/v1/updateRole', auth.auth, isAdmin, userProfile.updateUserRole);

// logout
route.patch('/auth/logout', auth.auth, logout);

export default route;
