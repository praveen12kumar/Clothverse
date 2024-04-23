import express from "express";
import { createCartItem, 
    deleteAllCartItem, 
    deleteCartItem, 
    getCartItemsOfUser, 
    increaseDecreaseCartItemQuantity} from "../controllers/cart.controller.js";
    
import { isAuthenticatedUser} from "../middlewares/auth.js";


const router = express.Router();

// Router

// add item in the cart
router.route("/cart").post(isAuthenticatedUser, createCartItem)
                    .get(isAuthenticatedUser, getCartItemsOfUser)
                    .put(isAuthenticatedUser, increaseDecreaseCartItemQuantity)
                    .delete(isAuthenticatedUser, deleteCartItem)

router.route("/cart/all").delete(isAuthenticatedUser, deleteAllCartItem);

export default router;
