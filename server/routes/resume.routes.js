import {Router} from "express";
import upload from "../middlewares/multer.middleware.js";
import ResumeController from "../controllers/resume.controller.js";


const router = Router();

router.get('/', ResumeController.getAllResumes)  // for admin
router.get('/users/:userId', ResumeController.getResumeByUserId)
router.get('/:id', ResumeController.getResumeById)
router.delete('/:id', ResumeController.deleteResumeById)
// Allow user to update the resume and save it locally (with chatbot on the side), premium - AI does the modification
router.put('/:id', (req, res) => {res.json({message: `Update Resume By Id: ${req.params.id}`})})
router.post('/upload', upload.single("resume"), ResumeController.uploadResume)    //upload then parse then save db

export default router;