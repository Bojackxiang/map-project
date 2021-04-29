import { response } from "express";
import jwt from "jsonwebtoken";
import { responseGenerator } from "./ResponseGenerator";

export const generateJWTToken = (email: string) => {
    return jwt.sign(email, process.env.SECRET as string);
};

export const verifyJWTToken = async (token: string) => {
    try {
        const verifyResult = await jwt.verify(
            token,
            process.env.SECRET as string
        );

        if (verifyResult)
            return responseGenerator(true, "session verified successfully");

        throw new Error("JWT verification error");
    } catch (error) {
        return responseGenerator(false, error.message);
    }
};

export const decodeJWT = async (token: string) => {
    try {
        const verifyResult = await jwt.verify(
            token,
            process.env.SECRET as string
        );

        return responseGenerator(true, 'Token verified successfully', verifyResult)
    } catch (error) {
        return responseGenerator(false, 'Token is not valid', null)
    }
}
