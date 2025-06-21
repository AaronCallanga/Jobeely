import {Router} from 'express';
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get('/', UserController.getAllUsers)   //for admin
router.get('/:id', UserController.getUserById)  // for user profile
router.delete('/:id', UserController.deleteUserById) //admin
router.put('/:id', UserController.updateUserById) // updating user profile
router.post('/', UserController.createUser) //admin

export default router;