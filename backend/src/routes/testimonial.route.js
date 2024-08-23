import express from "express"
import * as Testimonial from "../controllers/testimonial.controller.js"
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/all", auth, Testimonial.getWallOfLove);
router.get("/config", auth, Testimonial.getWallOfLoveConfig);
router.put("/config", auth, Testimonial.editConfigs);
router.get("/wall-of-love/:id", Testimonial.renderWallOfLove);
router.get('/:id', auth, Testimonial.getTestimonialById);
router.put('/:id', auth, Testimonial.editTestimonial);
router.post('/:id', auth, Testimonial.addToWallOfLove);

export default router;