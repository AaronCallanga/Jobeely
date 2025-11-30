import {Router} from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.post('/sign-up', AuthController.signUp)
router.post('/sign-in', AuthController.signIn)
router.post('/sign-out', AuthController.signOut)

export default router;      //allow us to use any name when importing, but when we export const router (variable name) we need to import using import { router }

//      Export named function	export const errorMiddleware = ...	            ✅ Yes	                        You must use { } on import
//      Import named export	    import { errorMiddleware } from './file.js'	    ✅ Yes	                        Must match the export name
//      Import default export	import someName from './file.js'	            ❌ Not default export here	    Won't work unless exported as export default