import express from "express";
import {
    createProduct, 
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDetails,
    getAllCategories,
    getLatestProducts,
    createProductReview,
    getProductReviews,
    deleteReview,


} from "../controllers/product.controller.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();
router.route("/products").get(getAllProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/products/categories").get(getAllCategories);

router.route("/products/latest").get(getLatestProducts);

router.route("/admin/product/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

router.route("/products/:id").get(getProductDetails);

router.route("/product/review").put(isAuthenticatedUser, createProductReview);

router.route("/product/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

export default router;