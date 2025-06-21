import {Router} from "express";
import upload from "../middlewares/multer.middleware.js";
import ResumeController from "../controllers/resume.controller.js";

const router = Router();

router.get('/', ResumeController.getAllResumes)  // for admin
router.get('/users/:userId', ResumeController.getResumeByUserId)
router.get('/:id', (req, res) => {res.json({message: `Get Resume By Id: ${req.params.id}`})})
router.delete('/:id', (req, res) => {res.json({message: `Delete Resume By Id: ${req.params.id}`})})
router.put('/:id', (req, res) => {res.json({message: `Update Resume By Id: ${req.params.id}`})})
router.post('/upload', upload.single("resume"), ResumeController.uploadResume)    //upload then parse then save db

export default router;