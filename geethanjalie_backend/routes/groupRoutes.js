import express from 'express';
import {createGroup, deleteGroup, editGroups, getGroups} from "../controllers/groupController.js";

const router = express.Router();



router.route('/group').post(createGroup); // api for creating a new group
router.route('/group').get(getGroups); // api for getting all groups
router.route('/updateGroup/:id').put(editGroups); // api for updating a group
router.route('/deleteGroup/:id').delete(deleteGroup); // api for deleting a group

export default router;