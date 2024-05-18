import express from "express";
import { createProductReview, getProductReviews, getProductReview, deleteReview } from "../controllers/review.controller.js";
import { isAuthenticatedUser} from "../middlewares/auth.js";

const router = express.Router();

router.route("/product/review").post(isAuthenticatedUser, createProductReview);
router.route("/product/reviews/:id").get(getProductReviews);
router.route("/product/review/:id").get(isAuthenticatedUser, getProductReview).delete(isAuthenticatedUser, deleteReview);


export default router;