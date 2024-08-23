import catchAsync from "../utils/catchAsync.js"
import httpStatus from "http-status"
import { createDoubt, getAllMatchingDoubts, getAllPreviousDoubts, updateDoubt } from "../services/doubt.service.js"

const doubt = catchAsync(async (req, res) => {
    console.log(req.userId, 'request user')
    const newDoubt = await createDoubt(req.body, req.userId)
    res.status(httpStatus.OK).send({ success: true, newDoubt })
})

const getDoubts = catchAsync(async (req, res) => {
    if (Object.keys(req.query).length !== 0) {
        let subjects = req.query.subjects.split(",")
        const matchingDoubts = await getAllMatchingDoubts(subjects, req.query.language, req.userId)
        res.status(httpStatus.OK).send({ success: true, matchingDoubts })
    }
    else {
        const doubtsHistory = await getAllPreviousDoubts(req.userId)
        res.status(httpStatus.OK).send({ success: true, studentDoubtHistory: doubtsHistory })
    }
})

const resolveDoubt = catchAsync(async (req, res) => {
    console.log(req.body)
    const doubt = await updateDoubt(req.body, req.params.id, req.userId)
    res.status(httpStatus.OK).send({ success: true, doubt })
})

export {
    doubt,
    getDoubts,
    resolveDoubt
}