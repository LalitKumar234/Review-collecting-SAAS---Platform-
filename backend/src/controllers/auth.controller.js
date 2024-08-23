
import { loginUserWithEmailAndPassword } from "../services/auth.service.js";
import { generateAuthTokens } from "../services/token.service.js";
import { createUser } from "../services/user.service.js";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { createNewForm, getAllForms } from "../services/form.service.js";

const register = catchAsync(async (req, res) => {
    const user = await createUser(req.body);
    const tokens = await generateAuthTokens(user);
    const form = await createNewForm(user._id)
    res.status(httpStatus.CREATED).send({ user, tokens, formId: form.formId });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password, 'password')
    const user = await loginUserWithEmailAndPassword(email, password);
    const form = await getAllForms(user._id);
    console.log(user, form, "login")
    const tokens = await generateAuthTokens(user);
    res.status(httpStatus.OK).send({ user, tokens, form:form.forms[0] });
});


export {
    register,
    login
};