import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImagefield: {
    type: String,
  },
  forms: [{
    type: mongoose.Types.ObjectId,
    ref: "Form",
    required: true
  }],
}, { timestamps: true })

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

export const User = mongoose.model("users", userSchema);

