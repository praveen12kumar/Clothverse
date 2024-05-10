import express from "express";
import {createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    createBlogComment,
    getBlogComments,
    getBlogComment} from "../controllers/blog.controller.js";

import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.route("/blogs").get(getAllBlogs);
router.route("/blog/:id").get(getSingleBlog)
router.route("/blogs/reviews/:id").get(getBlogComments);
router.route('/blogs/review/:id').get(isAuthenticatedUser,getBlogComment).post(isAuthenticatedUser,createBlogComment);

router.route('/blogs/create').post(isAuthenticatedUser,authorizeRoles("admin"),createBlog);
router.route("/admin/blog/:id").patch(isAuthenticatedUser,authorizeRoles("admin"),updateBlog).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteBlog);



export default router;