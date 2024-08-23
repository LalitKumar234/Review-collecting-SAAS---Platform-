import mongoose from "mongoose";

const doubtSchema = mongoose.Schema({
    doubtTitle: {
        type: String,
        required: true,
    },
    doubtContent: {
        type: String,
        required: true,
    },
    language:{
        type: String,
    },
    subject: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
},{ timestamps: true })

export const Doubt = mongoose.model("doubts", doubtSchema);
