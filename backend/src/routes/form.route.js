import express from "express"
import { auth } from "../middlewares/auth.middleware.js";
import * as FormController from "../controllers/form.controller.js"

const router = express.Router();

router.get('/', auth, FormController.getForms)
router.post('/create', auth, FormController.createForm)
router.put('/update-form-settings/:id', auth, FormController.updateFormSettings)
router.get('/get-form/:id', FormController.getFormById)
router.get('/submissions', auth, FormController.getSubmissions)
router.get('/submissions/:id', auth, FormController.getSubmissionsById)

export default router;