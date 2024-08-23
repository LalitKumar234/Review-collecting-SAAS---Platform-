import catchAsync from "../utils/catchAsync.js"
import httpStatus from "http-status"
// import { createNewForm, getAllForms, submitFormService } from "../services/form.service.js"
import * as FormService from "../services/form.service.js"

export const createForm = catchAsync(async (req, res) => {
    console.log(req.userId, 'request user')
    const newForm = await FormService.createNewForm(req.body, req.userId)
    res.status(httpStatus.OK).send({ success: true, newForm })
})

export const getForms = catchAsync(async (req, res) => {
    console.log(req.userId, 'request user')
    const allForms = await FormService.getAllForms(req.userId)
    console.log(allForms)
    res.status(httpStatus.OK).send({ success: true, allForms })
})

export const submitForm = catchAsync(async (req, res) => {
    console.log(req.body)
    console.log(req.params)

    const submitData = await FormService.submitFormService(req.params.id, req.body)
    res.status(httpStatus.OK).send({ success: true, submitData })
})


export const updateFormSettings = catchAsync(async (req, res) => {
    // console.log(req.userId, 'request user')
    const updatedFormData = await FormService.updateFormSettingsService(req.params.id, req.body, req.userId)
    res.status(httpStatus.OK).send({ success: true, updatedFormData })
})


export const getFormById = catchAsync(async (req, res) => {
    const form = await FormService.getById(req.params.id, req.body, req.userId)
    res.status(httpStatus.OK).send({ success: true, form })
})

export const getSubmissions = catchAsync(async (req, res) => {
    const submissions = await FormService.getFormSubmissions(req.userId)
    res.status(httpStatus.OK).send({ success: true, submissions })
})

export const getSubmissionsById = catchAsync(async(req, res)=> {
    const submissions = await FormService.getFormSubmissionsById(req.params.id, req.userId)
    res.status(httpStatus.OK).send({ success: true, submissions })
})