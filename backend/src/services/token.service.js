import jwt from "jsonwebtoken"
import { tokenTypes } from "../config/token.js";


const generateToken = (userId, expires, type, secret = "jwt-secret") => {
    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: expires,
        type,
    };
    return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
    const expires = Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60;

    const accessToken = generateToken(user.id, expires, tokenTypes.ACCESS)
    return {
        access: {
            token: accessToken,
            expires: new Date(expires * 1000)
        }
    }
};


export {
    generateToken,
    generateAuthTokens,
};