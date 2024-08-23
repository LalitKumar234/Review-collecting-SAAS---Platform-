import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { Form } from "../models/form.model.js";
import { User } from "../models/user.model.js";
import uniqid from "uniqid"
import { FormSubmission } from "../models/formsubmission.model.js"


const createNewForm = async (userId) => {
    let existingUser;

    if (!userId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    existingUser = await User.findById(userId);

    if (!existingUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exists');
    }

    const formId = generateId()

    const newForm = new Form({
        user: existingUser,
        formId,
    })

    const session = await mongoose.startSession();
    session.startTransaction();
    await newForm.save({ session })
    existingUser.forms.push(newForm);
    await existingUser.save({ session });
    await session.commitTransaction();
    return newForm;
}

const generateId = () => {
    return uniqid.time()
}

const getAllForms = async (userId) => {
    const forms = await User.findById(userId).populate({ path: 'forms', model: Form }).select('username email')
    return forms
}

const publishForm = async (formId, formTemplateId, data) => {
    if (!formId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Form does not exist');
    }
    if (!formTemplateId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Form does not exist');
    }
    const form = await Form.findOne({ formId });

}

const submitFormService = async (formId, formDetails) => {
    if (!formId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Form does not exist');
    }

    const form = await Form.findOne({ formId });

    if (!form) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Form does not exist');
    }

    const newSubmission = new FormSubmission({
        formId,
        videoTestimonialLink: formDetails.videoTestimonialLink,
        textTestimonialData: formDetails.textTestimonialData,
        extraDetails: formDetails.extraDetails,
        form: form._id,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Save the new form submission
        await newSubmission.save({ session });

        // Add the new submission to the form's submissions array
        form.submissions.push(newSubmission);
        await form.save({ session });

        await session.commitTransaction();

        return newSubmission;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};


export const updateFormSettingsService = async (formId, data) => {
    const form = await Form.findOne({ formId: formId });

    console.log(form)

    if (!form) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Form does not exist');
    }

    const updatedForm = await Form.findByIdAndUpdate(form._id, data, { new: true });
    return updatedForm


}

export const getById = async (formId) => {
    const form = await Form.findOne({ formId: formId });
    return form
}

export const getFormSubmissions = async (userId) => {
    const submissions = await Form.find({ user: userId })
        .populate({
            path: 'submissions',
        })
        .select('_');
    return submissions;
}

export const getFormSubmissionsById = async (formId, userId) => {
    const submissions = await FormSubmission.find({ formId })
    return submissions
}

export {
    createNewForm,
    getAllForms,
    submitFormService
}