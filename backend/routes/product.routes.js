import express from "express";
import {
    createProduct, 
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDetails,


} from "../controllers/product.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";


const router = express.Router();
router.route("/all").get(getAllProducts);
router.route("/create").post(createProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

export default router;