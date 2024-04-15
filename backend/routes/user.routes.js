import { Router } from "express";
import {
    registerUser,
    loginUser,
    logout,
    changeUserPassword,
    getCurrentUser,
    verifyEmail,
    forgotPassword,




} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = Router();

router.route("/register").post(upload.single("avatar"),registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(isAuthenticatedUser, logout);
router.route("/change-password").post(isAuthenticatedUser, changeUserPassword);
router.route('/user').get(isAuthenticatedUser, getCurrentUser);
router.route('/verify-email').post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);


export default router;