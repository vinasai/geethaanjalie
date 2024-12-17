import express from 'express';
import {createNotification, getNotification} from "../controllers/notificationController.js";

const router = express.Router();



router.route('/createNotification').post(createNotification); // api for creating a new group
router.route('/getNotification').get(getNotification); // api for getting all groups


export default router;