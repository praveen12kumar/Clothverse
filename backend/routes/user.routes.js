import { Router } from "express";
import {
    registerUser,
    loginUser,
    logout,
    changeUserPassword,
    getCurrentUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser

} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = Router();

router.route("/register").post(upload.single("avatar"),registerUser);

// router.route("/register").post(upload.single("avatar"), (req, res)=>{
//     console.log("Path", req.file);
// })

router.route("/login").post(loginUser);

router.route("/logout").post(isAuthenticatedUser, logout);

router.route("/change-password").post(isAuthenticatedUser, changeUserPassword);

router.route('/me').get(isAuthenticatedUser, getCurrentUser);

router.route("/forgot-password").post(forgotPassword);

router.route("/update").post(isAuthenticatedUser, updateProfile);

router.route('/verify-email/:token').put(verifyEmail);

router.route("/reset-password/:token").put(resetPassword);

router.route("/admin/all").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
.get(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)



export default router;