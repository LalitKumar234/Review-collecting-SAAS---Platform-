import mongoose from "mongoose";

const formSchema = mongoose.Schema({
    name: {
        type: String,
        default: "Form"
    },
    title: {
        type: String,
        default: "This is form title"
    },
    description: {
        type: String,
        default: "Write a review for us and get offers on next order"
    },
    formId: {
        type: String,
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    formTemplateId: {
        type: String,
    },
    formConfig: {
        type: {
            _id: false,
            questions: {
                type: [String],
                default: [
                    "What is the best thing about [our product / service]",
                    "How has [our product / service] helped you?",
                    "Who are you / what are you working on?"
                ]
            },
            enableVideo: {
                type: Boolean,
                default: true
            },
            thankYouTitle: {
                type: String,
                default: "Thank you!"
            },
            thankYouMessage: {
                type: String,
                default: "Thank you so much for your shoutout! It means a ton to us!"
            },
            includeCta: {
                type: Boolean,
                default: false
            },
            ctaText: {
                type: String,
                default: "Button Text"
            },
            ctaLink: {
                type: String,
            },
            includeAvatarField: {
                type: Boolean,
                default: true
            },
            includeNameField: {
                type: Boolean,
                default: true
            },
            includeEmailField: {
                type: Boolean,
                default: true
            },
            includeRoleField: {
                type: Boolean,
                default: true
            },
        },
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    submissions: [{
        type: mongoose.Types.ObjectId,
        ref: "FormSubmission",
        required: true
    }]
}, { timestamps: true })

export const Form = mongoose.model("forms", formSchema);
