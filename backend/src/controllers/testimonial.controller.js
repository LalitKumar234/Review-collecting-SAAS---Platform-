import catchAsync from "../utils/catchAsync.js"
import httpStatus from "http-status"
import * as TestimonialService from "../services/testimonial.service.js"

export const addToWallOfLove = catchAsync(async (req, res) => {
    const userId = req.userId
    const testimonialId = req.params.id
    const result = await TestimonialService.addToWallOfLove(userId, testimonialId)
    res.status(httpStatus.OK).send({ success: true, result })
})

export const getTestimonialById = catchAsync(async (req, res) =>{
    const userId = req.userId
    const testimonialId = req.params.id
    const testimonial = await TestimonialService.getTestimonialById(userId, testimonialId)
    res.status(httpStatus.OK).send({ success: true, testimonial })
})

export const editTestimonial = catchAsync(async (req, res) => {
    const userId = req.userId
    const testimonialId = req.params.id
    const testimonial = await TestimonialService.editTestimonial(userId, testimonialId, req.body)
    res.status(httpStatus.OK).send({ success: true, testimonial })
})

export const getWallOfLove = catchAsync(async (req, res) => {
    const userId = req.userId
    const wallOfLove = await TestimonialService.getWallOfLove(userId)
    res.status(httpStatus.OK).send({ success: true, wallOfLove })
})

export const editConfigs = catchAsync(async (req, res) => {
    const userId = req.userId
    const wallOfLoveConfigs = await TestimonialService.editConfigs(userId, req.body)
    res.status(httpStatus.OK).send({ success: true, wallOfLoveConfigs })
})

export const getWallOfLoveConfig = catchAsync(async (req, res) => {
    const userId = req.userId
    const wallOfLoveConfigs = await TestimonialService.getWallOfLoveConfig(userId)
    res.status(httpStatus.OK).send({ success: true, wallOfLoveConfigs })
})

export const renderWallOfLove = catchAsync(async (req, res) => {
    const wallOfLoveId = req.params.id
    const wallOfLove = await TestimonialService.renderWallOfLove(wallOfLoveId)
    res.status(httpStatus.OK).send({ success: true, wallOfLove })
})