import httpStatus from "http-status"
import { getUserByEmail } from "./user.service.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs"

const loginUserWithEmailAndPassword = async (email, password) => {

  const user = await getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")
  }
  return user;
};


export {
  loginUserWithEmailAndPassword
}