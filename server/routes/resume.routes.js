import {Router} from "express";
import upload from "../middlewares/multer.middleware.js";
import ResumeController from "../controllers/resume.controller.js";

const router = Router();

router.get('/', (req, res) => {res.json({message: "Get All Resume"})})  // for admin
router.get('/users/:userId', (req, res) => {res.json({message: `Get All Resume By User Id ${req.params.userId}`})})
router.get('/:id', (req, res) => {res.json({message: `Get Resume By Id: ${req.params.id}`})})
router.delete('/:id', (req, res) => {res.json({message: `Delete Resume By Id: ${req.params.id}`})})
router.put('/:id', (req, res) => {res.json({message: `Update Resume By Id: ${req.params.id}`})})
router.post('/upload', upload.single("resume"), ResumeController.uploadResume)    //upload then parse then save db

export default router;