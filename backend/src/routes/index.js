
import express from "express"
import authRoute from "./auth.route.js"
import formRoute from "./form.route.js"
import testimonialRoute from "./testimonial.route.js"

const router = express.Router();

router.use("/auth", authRoute)
router.use("/form", formRoute)
router.use("/testimonial", testimonialRoute)
// router.use("/submit", )


export default router;