import express from "express";
import { createOrderId, getPaymentApiKey } from "../controllers/payment.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();


router.route("/getKey").get(isAuthenticatedUser, getPaymentApiKey)
router.route("/create").post(isAuthenticatedUser, createOrderId);

export default router;