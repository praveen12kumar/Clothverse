import express from  "express";
import { newOrder,
        getOrderDetails,
        myOrders,
        getAllOrders,
        updateOrder,
        deleteOrder

} from "../controllers/order.controller.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/order/create").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), upload.none(), updateOrder);

router.route("/order/:id").delete(isAuthenticatedUser, deleteOrder);

export default router; 