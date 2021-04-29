import { response } from "express";
import FirebaseService from "../firebase/Firebase";
import { generateJWTToken, verifyJWTToken } from "../utils/JWTToken";
import { encodePassword, decodePassword } from "../utils/PasswordEncryption";
import { responseGenerator } from "../utils/ResponseGenerator";

export enum Roles {
    ADMIN = "ADMIN",
    READER = "READER",
}

export interface UserInterface {
    email?: string;
    username?: string;
    password?: string;
    role?: Roles;
}

export interface IUserVerify {
    email: string;
    password: string;
}

export interface IVerifyUser {
    password?: string;
    email?: string;
    sessionToken?: string;
}

enum mappingMode {
    CREATE = "CREATE",
    GET = "GET",
}

class User implements UserInterface {
    username: string | undefined = "";
    password: string | undefined = "";
    email: string | undefined = "";
    role: Roles | undefined = Roles.READER;

    constructor(user: UserInterface | null) {
        if (user !== null) {
            this.username = user.username;
            this.password = user.password;
            this.email = user.email;
            this.role = user.role;
        }
    }

    async save() {
        let success, message;
        try {
            if (!this.username || !this.password || !this.email || !this.role)
                throw new Error("Not enough information to create a user");
            console.log(this.role);
            if (this.role !== Roles.ADMIN && this.role !== Roles.READER)
                throw new Error("Not Correct information to create a user");

            const currentUser = this.mapUserAttribute(mappingMode.CREATE);

            const saveUserResult = await FirebaseService.saveUserToDataBase(
                currentUser
            );

            if (!saveUserResult.success) {
                throw new Error(saveUserResult.message);
            }
        } catch (error) {
            success = false;
            message = error.message;
        } finally {
            return responseGenerator(success, message);
        }
    }

    async verify(loginUser: IVerifyUser) {
        try {
            const { email, password, sessionToken } = loginUser;

            // => If the session token is available
            if (sessionToken) {
                const verifyResult = await verifyJWTToken(sessionToken);

                if (verifyResult.success) {
                    return responseGenerator(true, "Token verified");
                }

                // token verified fail will ask user to re login in again
                throw new Error("Session token verified fail, sign in again");
            }

            // => If the email and password is available
            if (email && password) {
                const dbUser = await FirebaseService.findSingleUser({
                    email,
                    password,
                });

                if (!dbUser.success) {
                    throw new Error(dbUser.message);
                }

                if (
                    await this.passwordCompare(
                        dbUser.payload.password,
                        password
                    )
                ) {
                    const token = generateJWTToken(dbUser.payload.email);
                    return responseGenerator(true, "Password is correct!", {
                        token,
                        ...dbUser.payload,
                    });
                } else {
                    throw new Error("Password is incorrect");
                }
            }

            // => If not above case
            throw new Error("Not enough information to verify");
        } catch (error) {
            return responseGenerator(false, error.message);
        }
    }

    async deleteUser() {}

    async updateUser() {}

    async findUserByEmail(email: string) {
        try {
            const dbUser = await FirebaseService.findUserByEmail(email);
            if (!Boolean(dbUser.payload)) {
                return responseGenerator(
                    false,
                    "No User is found by given email",
                    null
                );
            }
            return responseGenerator(
                true,
                "User has been fond by the email",
                dbUser.payload
            );
        } catch (error) {
            return responseGenerator(
                false,
                `Error findUserByEmail: ${error.message}`,
                null
            );
        }
    }

    mapUserAttribute(mode: mappingMode) {
        encodePassword;
        return {
            username: this.username,
            password:
                mode === mappingMode.CREATE
                    ? encodePassword(this.password)
                    : decodePassword(this.password),
            email: this.email,
            role: this.role,
        };
    }

    async passwordCompare(dbPassword: string, reqPassword: string) {
        console.log({
            dbPassword,
            reqPassword,
            decode: decodePassword(dbPassword),
        });
        return reqPassword === decodePassword(dbPassword);
    }

    async listAllUser() {
        try {
            const {
                success,
                message,
                payload,
            } = await FirebaseService.findAllUserByAdmin();

            if (!success) throw new Error(message);

            return responseGenerator(
                true,
                `Success: listAllUser successfully`,
                payload
            );
        } catch (error) {
            return responseGenerator(
                false,
                `Error: ListAllUser ${error.message}`,
                null
            );
        }
    }
}

export default User;
