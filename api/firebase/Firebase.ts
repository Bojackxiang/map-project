import firebase from "firebase";
import admin, { ServiceAccount } from "firebase-admin";
import * as serviceAccount from "../accountKey.json";
import { firebaseConfig } from "../configs";
import { UserInterface } from "../Modal/User";
import { responseGenerator } from "../utils/ResponseGenerator";

// first base starter

class FirebaseService {
    _firebaseDatabase: firebase.app.App | undefined;

    get firebaseDatabase() {
        return this._firebaseDatabase;
    }

    async fire_base_starter() {
        try {
            this._firebaseDatabase = await firebase.initializeApp(
                firebaseConfig
            );
            await firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.NONE);
            admin.initializeApp({
                credential: admin.credential.cert(
                    serviceAccount as ServiceAccount
                ),
            });
            console.log('here')
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    async saveUserToDataBase(user: UserInterface) {
        let success = true,
            message = "";
        try {
            if (!this._firebaseDatabase)
                throw new Error("No database instance existed");
            if (!user) throw new Error("No input User");

            const databaseRef = this._firebaseDatabase
                .firestore()
                .collection("users");
            const snapshot = await databaseRef
                .where("email", "==", user.email)
                .get();
            if (snapshot.size >= 1)
                throw new Error("User with same email already exists");

            this._firebaseDatabase
                .firestore()
                .collection("users")
                .doc()
                .set({
                    ...user,
                });
            success = true; //
            message = "Create user successfully";
        } catch (error) {
            success = false;
            message = error.message;
        } finally {
            return responseGenerator(success, message);
        }
    }

    async findSingleUser(user: Partial<UserInterface>) {
        try {
            if (!this._firebaseDatabase)
                throw new Error("No database instance existed");
            if (!user.email || !user.password) throw new Error("No input User");

            const databaseRef = this._firebaseDatabase
                .firestore()
                .collection("users");

            const snapshot = await databaseRef
                .where("email", "==", user.email)
                .get();

            // if snapshot size === 0, means there is no such a user

            if (snapshot.size <= 0) {
                throw new Error(`No such a user with this ${user.email}`);
            }

            const foundUser = await getUser(snapshot);
            return responseGenerator(
                true,
                `Find the user with ${user.email}`,
                foundUser
            );
        } catch (error) {
            return responseGenerator(false, error.message);
        }
    }

    async findUserByEmail(email: string) {
        try {
            // check if the database exist
            if (!this._firebaseDatabase)
                throw new Error("No database instance existed");

            // input email have to be valid
            if (!email) throw new Error("No Email Provided! ");

            const databaseRef = this._firebaseDatabase
                .firestore()
                .collection("users");

            // 检查长度
            const snapshot = await databaseRef
                .where("email", "==", email)
                .get();

            if (snapshot.size <= 0) {
                throw new Error(`No such a user with email as ${email}`);
            }

            const foundUser = await getUser(snapshot);

            return responseGenerator(
                true,
                `Find the role check user`,
                foundUser
            );
        } catch (error) {
            return responseGenerator(false, error.message);
        }
    }

    async findAllUserByAdmin() {
        try {
            // check if the database exist
            if (!this._firebaseDatabase)
                throw new Error("No database instance existed");

            const databaseRef = this._firebaseDatabase
                .firestore()
                .collection("users");

            let usersList: any[] = [];
            const snapshot = await databaseRef.get();
            snapshot.forEach((user) => {
                const { email, username, role } = user.data();
                usersList.push({ email, username, role });
            });

            return responseGenerator(
                true,
                "Success: findAllUserByAdmin",
                usersList
            );
            
        } catch (error) {
            return responseGenerator(false, "Error: findAllUserByAdmin", null);
        }
    }
}

// export a instance rather than a class every time o save memory
export default new FirebaseService();

type snapshotType = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
const getUser = (snapshot: snapshotType) => {
    return new Promise((resolve, reject) => {
        snapshot.forEach((doc) => resolve(doc.data()));
        reject(null);
    });
};
