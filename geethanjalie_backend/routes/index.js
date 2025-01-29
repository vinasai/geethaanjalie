import express from "express";

import userRoutes from "./userRoutes.js";
import groupRoutes from "./groupRoutes.js";
import classRoutes from "./classRoutes.js";
import notificationRoutes from "./notificationRoutes.js";



const router = express.Router();

router.use("/api/users", userRoutes); // user routes apis
router.use("/api/groups", groupRoutes); // group routes apis
router.use("/api/classes", classRoutes); // class routes apis
router.use("/api/notification", notificationRoutes); // class routes apis




export default router;