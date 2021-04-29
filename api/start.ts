require("dotenv").config();
import express from "express";
import user_routers from "./routers/users";
import cors from "cors";
import configs from "./configs";
import FirebaseService from "./firebase/Firebase";
import bodyParser from "body-parser";

export const start = async () => {
    try {
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());
        configs;

        const firebase_init_result = await FirebaseService.fire_base_starter();
        if (!firebase_init_result) throw new Error("Firebase fail to start...");

        app.use("/api", user_routers);

        process.on("SIGINT", function () {
            // when user clicked the CRL + C to exit the process
            process.exit(0);
        });

        app.listen(configs.PORT, async () => {
            console.log(`LISTENING ON ${configs.PORT}...`);
        });

    } catch (error) {
        process.exit(-1);
    }
};
