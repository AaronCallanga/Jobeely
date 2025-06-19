import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {res.json({message: "Get All Users"})})   //for admin
router.get('/:id', (req, res) => {res.json({message: `Get User By Id: ${req.params.id}`})})  // for user profile
router.delete('/:id', (req, res) => {res.json({message: `Delete User By Id: ${req.params.id}`})}) //admin
router.put('/:id', (req, res) => {res.json({message: `Update User By Id: ${req.params.id}`})}) // updating user profile
router.post('/', (req, res) => {res.json({message: `Create user`})}) //admin

export default router;