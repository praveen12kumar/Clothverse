import express from  "express";
import { newOrder,
        getSingleUser,
        myOrders,
        getAllOrders,
        updateOrder,
        deleteOrder

} from "../controllers/order.controller.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";


const router = express.Router();

router.route("/order/create").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleUser);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);



export default router;