import express from 'express';

// 2/18-- reset password section 
import {
    createUser,
    deleteUser,
    forgotPassword, getUsers,
    loginUser,
    registerUser,
    resetPassword,
    verifiedUser,
    getUserCount,
    updateUser
} from '../controllers/userController.js';
import { get } from 'mongoose';

const router = express.Router();



router.route('/register').post(registerUser); // api for user registration
router.route('/login').post(loginUser); // api for user login
router.route('/verified/:id').put(verifiedUser); // api for user verification(admin want to verify user)
router.route('/changePassword').put(resetPassword); // api for user reset password
router.route('/forgotPassword').post(forgotPassword); // api for user forgot password
router.route('/getUsers').get(getUsers); // api for get all users
router.route('/addUser').post(createUser);
router.route('/deleteUser/:id').delete(deleteUser);
router.route('/userCount').get(getUserCount);
router.route("/updateUser/:id").put(updateUser);





export default router;