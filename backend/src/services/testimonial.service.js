import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import { WallOfLove } from "../models/wallOfLove.model.js"
import { FormSubmission } from "../models/formsubmission.model.js"
import { v4 as uuidv4 } from 'uuid';

export const addToWallOfLove = async (userId, testimonialId) => {
    if (!userId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const existingUser = await User.findById(userId);

    if (!existingUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist');
    }

    const existingWallOfLove = await WallOfLove.findOne({ userId });

    if (!existingWallOfLove) {
        const newWallOfLove = await WallOfLove.create({
            userId,
            wallOfLove: [testimonialId],
            wallOfLoveId: `wall-${uuidv4()}`,
        });
        return newWallOfLove;
    }

    // Check if testimonialId is already in the array
    if (existingWallOfLove.wallOfLove.includes(testimonialId)) {
        // Remove the testimonialId from the array
        await WallOfLove.updateOne({ userId }, { $pull: { wallOfLove: testimonialId } });
        await FormSubmission.findByIdAndUpdate({ _id: testimonialId }, { $set: { addedToWall: false } }, { new: true })
    } else {
        // Add the testimonialId to the array using $addToSet to avoid duplicates
        await WallOfLove.updateOne({ userId }, { $addToSet: { wallOfLove: testimonialId } });
        await FormSubmission.findByIdAndUpdate({ _id: testimonialId }, { $set: { addedToWall: true } }, { new: true })
    }
    const updatedWallOfLove = await WallOfLove.findOne({ userId });
    return updatedWallOfLove;
};

export const getTestimonialById = async (userId, testimonialId) =>{
    if (!userId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const existingUser = await User.findById(userId);
    if (!existingUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist');
    }
    const existingTestimonial = await FormSubmission.findOne({_id: testimonialId})
    return existingTestimonial
}

export const editTestimonial = async (userId, testimonialId, dataToBeEdited) => {
    if (!userId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const existingUser = await User.findById(userId);

    if (!existingUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist');
    }

   return await FormSubmission.findByIdAndUpdate({ _id: testimonialId }, { $set: dataToBeEdited }, { new: true })

}

export const getWallOfLove = async (userId) => {
    let existingUser;

    if (!userId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    existingUser = await User.findById(userId);

    if (!existingUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist');
    }

    let existingWallOfLove = await WallOfLove.find({ userId }).populate('wallOfLove');

    return existingWallOfLove;
}

export const editConfigs = async (userId, body) => {
    if (!userId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    let existingUser = await User.findById(userId);
    if (!existingUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist');
    }

    let existingWallOfLove = await WallOfLove.findOne({ userId });
    if (!existingWallOfLove) {
        throw new ApiError(httpStatus.NOT_FOUND, 'WallOfLove not found');
    }
    existingWallOfLove.wallOfLoveConfig = body;
    await existingWallOfLove.save();
    return existingWallOfLove.wallOfLoveConfig;
}

export const getWallOfLoveConfig = async (userId) => {
    if (!userId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    let existingUser = await User.findById(userId);
    if (!existingUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist');
    }
    let existingWallOfLove = await WallOfLove.findOne({ userId });
    if (!existingWallOfLove) {
        throw new ApiError(httpStatus.NOT_FOUND, 'WallOfLove not found');
    }
    return existingWallOfLove.wallOfLoveConfig;
}

export const renderWallOfLove = async (wallOfLoveId) => {
    if (!wallOfLoveId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'wallOfLoveId not found');
    }
    let existingWallOfLove = await WallOfLove.findOne({ wallOfLoveId }).populate('wallOfLove');
    return existingWallOfLove;
}