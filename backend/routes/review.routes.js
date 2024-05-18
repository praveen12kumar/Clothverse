import express from "express";
import { createProductReview, getProductReviews, getProductReview, deleteProductReview } from "../controllers/review.controller.js";
import { isAuthenticatedUser} from "../middlewares/auth.js";

const router = express.Router();

router.route("/product/review").post(isAuthenticatedUser, createProductReview);
router.route("/product/review").delete(isAuthenticatedUser, deleteProductReview);
router.route("/product/reviews/:id").get(getProductReviews);
router.route("/product/review/:id").get(isAuthenticatedUser, getProductReview)


export default router;