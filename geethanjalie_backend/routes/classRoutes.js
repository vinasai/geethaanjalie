import express from 'express';
import {createClass, getClass, editClass, deleteClass} from "../controllers/classController.js";

const router = express.Router();



router.route('/class').post(createClass); // api for creating a new class
router.route('/class').get(getClass); // api for getting all class
router.route('/updateClass/:id').put(editClass); // api for updating a class
router.route('/deleteClass/:id').delete(deleteClass); // api for deleting a class

export default router;