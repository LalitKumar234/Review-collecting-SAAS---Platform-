import mongoose from "mongoose";

const wallOfLoveConfigSchema = new mongoose.Schema({
    removeBranding: {
        type: Boolean,
        default: false
    },
    darkTheme: {
        type: Boolean,
        default: false
    },
    hideDate: {
        type: Boolean,
        default: false
    },
    hideSourceIcons: {
        type: Boolean,
        default: false
    },
    showAnimation: {
        type: Boolean,
        default: false
    },
    randomize: {
        type: Boolean,
        default: false
    },
    maxNumber: {
        type: Number,
        default: 20
    },
    cardSize: {
        type: Number,
        default: 350
    }
}, { _id: false })


const wallOfLoveSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    wallOfLoveId:{
        type: String, 
        unique: true
    },
    wallOfLove: [{
        type: mongoose.Types.ObjectId,
        ref: "FormSubmission",
        required: true
    }],
    wallOfLoveConfig: {
        type: wallOfLoveConfigSchema
    }
}, { timestamps: true })

export const WallOfLove = mongoose.model("wallOfLove", wallOfLoveSchema)