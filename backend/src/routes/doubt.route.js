import express from "express";
import { auth } from "../middlewares/auth.middleware.js"
import { doubt, getDoubts, resolveDoubt } from "../controllers/doubt.controller.js"


const router = express.Router();


router.post('/', auth, doubt)
router.get('/', auth, getDoubts)
router.put('/:id', auth, resolveDoubt)

// module.exports = router;
export default router;