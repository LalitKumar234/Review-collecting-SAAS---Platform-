import mongoose from "mongoose";

const textTestimonialSchema = new mongoose.Schema({
    testimonialText: {
        type: String,
    },
    profileImageUrl: {
        type: String
    }
}, { _id: false })

const extraDetailsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    role_company: {
        type: String
    },
    website: {
        type: String
    },
    grantPermission: {
        type: Boolean,
        default: false
    }
}, { _id: false })

const formSubmissionsSchema = new mongoose.Schema({
    formId: {
        type: String,
        required: true,
    },
    textTestimonialData: {
        type: textTestimonialSchema,
    },
    videoTestimonialLink: {
        type: String,
    },
    extraDetails: {
        type: extraDetailsSchema
    },
    form: {
        type: mongoose.Types.ObjectId,
        ref: "Form",
        required: true
    },
    addedToWall:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const FormSubmission = mongoose.model('FormSubmission', formSubmissionsSchema);
