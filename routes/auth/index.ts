import express from "express";
const router = express.Router();
import passport from "passport";
import returnRes from "./../../utils/return_res";
import UserException from "../../utils/user_exception";
import isLoggedIn from "../../utils/auth/is_logged_in";
import User from "./../../utils/user";
import { User as IUser } from "./../../@types/user";

// @route   POST auth
// @desc    Auth User
// @access  Public
router.post("/", async (req, res, next) => {
    try {
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
    } catch (err) {
        if (err instanceof UserException) {
            // send error
            res.status(200).json(returnRes(false, null, err.message, 400));
        } else {
            console.log(err);
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

router.get("/check", isLoggedIn, async (req, res) => {
    if (req.session) {
        const { email } = req.user as IUser;
        // get and return user
        const data = await User.getUser(email);
        delete data.user?.password;
        const user = data.user;
        res.status(200).json(returnRes(true, { user }, "you are logged in", 200));
    } else {
        res.status(200).json(
            returnRes(false, null, "you are not logged in", 401)
        );
    }
});

router.post("/logout", isLoggedIn, async (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(200).json(
                    returnRes(false, null, "error logging out", 400)
                );
            } else {
                res.status(200).json(returnRes(true, null, "logged out", 200));
            }
        });
    } else {
        res.status(200).json(
            returnRes(false, null, "you are not logged in", 401)
        );
    }
});

module.exports = router;
