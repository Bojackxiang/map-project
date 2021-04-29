const { MODE, DB_URL_PROD, DB_URL_DEV, DB_NAME, PORT } = process.env;

const configs = {
    PORT: PORT ?? "",
    MODE: MODE ?? "",
    DB_URL: "",
    DB_NAME: DB_NAME ?? "",
};

switch (MODE) {
    case "DEV":
        configs.DB_URL = DB_URL_DEV ?? "";
        break;
    case "PROD":
        configs.DB_URL = DB_URL_PROD ?? "";
        break;
    default:
        configs.DB_URL = DB_URL_DEV ?? "";
        break;
}

export const firebaseConfig = {
  apiKey: "AIzaSyAGbI0Aqh5x1YNjNyaTwOjgzY7suMHty24",
  authDomain: "interview-ff4f9.firebaseapp.com",
  projectId: "interview-ff4f9",
  storageBucket: "interview-ff4f9.appspot.com",
  messagingSenderId: "376512823533",
  appId: "1:376512823533:web:e1411bc550f2aaebd14ce4",
  measurementId: "G-RPMC9ED5MZ",
};

export default configs;
