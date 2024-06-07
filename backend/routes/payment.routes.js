import express from "express";
import { createOrderId, getPaymentApiKey, paymentVerification } from "../controllers/payment.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();


router.route("/getKey").get(isAuthenticatedUser, getPaymentApiKey)
router.route("/create").post(isAuthenticatedUser, createOrderId);
router.route("/verify/:order_id").post(isAuthenticatedUser, paymentVerification);
export default router;