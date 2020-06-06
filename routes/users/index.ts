import express from "express";
const router = express.Router();
import User from "./../../utils/user";
import returnRes from "../../utils/return_res";
import UserException from "../../utils/user_exception";
import hashPassword from "../../utils/auth/hash_password";
import isLoggedIn from "./../../utils/auth/is_logged_in";
import { User as IUser } from "./../../@types/user";
import checkEmail from "../../utils/checks/check_email";
import passport from "passport";

// @route   GET users
// @desc    gets the user's data
// @access  Private
router.get("/", isLoggedIn, async (req, res) => {
    try {
        const { email } = req.user as IUser;
        // get and return user
        const data = await User.getUser(email);
        delete data.user?.password;
        res.status(200).json(data);
    } catch (err) {
        if (err instanceof UserException) {
            console.log("get user error", err);
            // send error
            res.status(200).json(returnRes(false, null, err.message, 400));
        } else {
            // send unhandled error
            res.status(500).json(
                returnRes(
                    false,
                    null,
                    "Internal Server Error",
                    500,
                    `addTodo Error: ${err}`
                )
            );
        }
    }
});

// @route   POST users
// @desc    creates an account
// @access  Public
router.post("/", async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;
        // throw errors here to avoid extra hashing power
        checkEmail(email);
        if (password !== confirmPassword) {
            res.status(200).json(
                returnRes(false, null, "passwords don't match", 400)
            );
        } else {
            // hash user's password
            const hashedPassword = await hashPassword(password);
            // create and return new user
            const data = await User.createUser(email, hashedPassword);
        passport.authenticate("local", (err, user) => {
            if (err) {
                return res
                    .status(500)
                    .json(
                        returnRes(
                            false,
                            null,
                            "there was an error logging you in",
                            500
                        )
                    );
            }
            if (!user) {
                return res
                    .status(200)
                    .json(
                        returnRes(false, null, "invalid email or password", 401)
                    );
            }
            if (user) {
                req.login(user, (loginErr) => {
                    if (loginErr) {
                        return res
                            .status(500)
                            .json(
                                returnRes(
                                    false,
                                    null,
                                    "there was an error logging you in",
                                    500
                                )
                            );
                    }
                    return res
                        .status(200)
                        .json(returnRes(true, { user }, "logged in", 200));
                });
            }
        })(req, res, next);
        }
    } catch (err) {
        if (err instanceof UserException) {
            // send error
            res.status(200).json(returnRes(false, null, err.message, 400));
        } else {
            // send unhandled error
            res.status(500).json(
                returnRes(
                    false,
                    null,
                    "Internal Server Error",
                    500,
                    `addTodo Error: ${err}`
                )
            );
        }
    }
});

// @route   DELETE users
// @desc    deletes the user's account
// @access  Private
router.delete("/", isLoggedIn, async (req, res) => {
    try {
        if (req.session) {
            const { email } = req.user as IUser;
            // delete user
            const data = await User.deleteUser(email);
            // logout user
            req.session.destroy((err) => {
                if (err) {
                    res.status(200).json(
                        returnRes(false, null, "error logging out", 400)
                    );
                } else {
                    res.status(200).json(
                        returnRes(
                            true,
                            null,
                            "account deleted and logged out",
                            200
                        )
                    );
                }
            });
        } else {
            returnRes(false, null, "please login again", 200);
        }
    } catch (err) {
        if (err instanceof UserException) {
            // send error
            res.status(200).json(returnRes(false, null, err.message, 400));
        } else {
            // send unhandled error
            res.status(500).json(
                returnRes(
                    false,
                    null,
                    "Internal Server Error",
                    500,
                    `addTodo Error: ${err}`
                )
            );
        }
    }
});

module.exports = router;
