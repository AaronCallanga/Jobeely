import {Router} from "express";

const router = Router();

router.post('/sign-up', (req, res) => {res.json({message: `Sign Up`})})
router.post('/sign-in', (req, res) => {res.json({message: `Sign In`})})
router.post('/sign-out', (req, res) => {res.json({message: `Sign Out`})})