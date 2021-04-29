import express from "express";
import User, { Roles } from "../Modal/User";
import { decodeJWT } from "../utils/JWTToken";
import { serverResponse } from "../utils/ResponseGenerator";
const user_routers = express.Router();

user_routers.post("/create-user", async (req, res) => {
    let success = true,
        code = 200,
        message = "Create the user successfully";

    try {
        const { username, email, password, role } = req.body;
        const user = new User({ username, email, password, role });
        const saveResult = await user.save();
        if (!saveResult.success) {
            code = 500;
            success = false;
            message = saveResult.message;
        }
    } catch (error) {
        success = false;
        code = 422;
        message = error.message;
    } finally {
        res.send(serverResponse(success, message, null, code));
    }
});

user_routers.post("/verify-user", async (req, res) => {
    const { email, password, sessionToken } = req.body;
    
    //check the session token
    const user = new User(null);
    
    const result = await user.verify({ email, password, sessionToken });

    if (!result.success) {
        res.send(
            serverResponse(
                result.success,
                result.message,
                null,
                result.success ? 200 : 401
            )
        );
        return;
    }

    
    const { username, role, token } = result.payload;

    res.send(
        serverResponse(
            result.success,
            result.message,
            {
                username,
                role,
                token,
            },
            result.success ? 200 : 401
        )
    );
});

user_routers.post("/admin_only", async (req, res) => {
    try {
        const {sessionToken } = req.body;
        let usersPayload = [];

        if (!sessionToken) {
            res.send(serverResponse(false, "No token provided", null, 401));
            return;
        }

        const decodeResult = await decodeJWT(sessionToken);
        if (!decodeResult.success) throw new Error("Invalid JWT token");
        const userEmail = decodeResult.payload;

        const user = new User(null);
        const findUserResult = await user.findUserByEmail(userEmail);
        if (!findUserResult.success) {
            throw new Error(findUserResult.message);
        }

        const { role } = findUserResult.payload;
        const isAdmin = role === Roles.ADMIN;

        // if is admin, find the all user data
        if(isAdmin) {
            const {payload} = await user.listAllUser()
            usersPayload = payload 
        }

        res.send(
            serverResponse(
                true,
                `Find the user with email ${userEmail}`,
                {
                    success: isAdmin ? true : false,
                    message: isAdmin ? "Yuu are a admin" : "You are not admin",
                    data: usersPayload
                },
                isAdmin ? 200 : 401
            )
        );
    } catch (error) {
        res.send(serverResponse(true, `Error: ${error.message}`, null, 500));
    }
});

export default user_routers;
