import {Router} from "express";

const router = Router();

router.post('/', (req, res) => {res.json({message: `Chat With General AI`})}) //will fetch the resume text, profile description, AI will based on that
// router.post('/:resumeId', (req, res) => {res.json({message: `Chat With AI about specific resume`})})

export default router;