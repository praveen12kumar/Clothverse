import express from "express";
import {
    createProduct, 
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDetails,
    getAllCategories,
    getLatestProducts,


} from "../controllers/product.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();
router.route("").get(getAllProducts);
router.route("/create").post(createProduct);
router.route("/categories").get(getAllCategories);
router.route("/latest").get(getLatestProducts);
router.route("/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);


export default router;