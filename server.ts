import express from "express";
import { ResponseError } from "./@types/response_error";
import returnRes from "./utils/return_res";
import session from "express-session";
import config from "config";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import rateLimit from "express-rate-limit";
import fileUpload from "express-fileupload";
import helmet from "helmet";
require("./utils/auth/config_passport")(passport);

const app = express();
const port = process.env.PORT || 5000;
const hostname = process.env.YOUR_HOST || "0.0.0.0";

// middleware
app.use(
    fileUpload({
        limits: { fileSize: 50 },
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", 1);

const whitelist = [
    "https://simple-todo-list-frontend.herokuapp.com",
    "https://simple-todo-list-backend.herokuapp.com",
    "http://localhost:5000",
    "http://localhost:3000",
];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (whitelist.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);
app.use(helmet());
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(
    session({
        secret: process.env.express_session_secret!,
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
            sameSite: "none",
            httpOnly: app.get("env") === "production",
            secure: app.get("env") === "production",
            // path: "/auth",
            expires: expiryDate,
            // domain: "http://localhost:3000/",
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
const limiter = rateLimit({
    windowMs: app.get("env") === "production" ? 15 * 60 * 1000 : 1,
    max: app.get("env") === "production" ? 1000 : 999999, 
});
app.use(limiter);
app.set("trust proxy", "loopback");

// routes
app.use("/users", require("./routes/users"));
app.use("/todos", require("./routes/todos"));
app.use("/auth", require("./routes/auth"));

// json error handler
app.use(
    (
        err: ResponseError,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
	) => {
		const { status } = err;
        if (status === 400)
            return res.status(status).json(returnRes(false, null, "Error parsing JSON", status));
        return next(err);
    }
);

app.listen(port, () => console.log(`App is listening on port: ${port} ❤ !!!`));
