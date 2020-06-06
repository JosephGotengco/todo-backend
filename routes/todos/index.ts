import express from "express";
const router = express.Router();
import User from "./../../utils/user";
import { User as IUser } from "./../../@types/user";
import returnRes from "../../utils/return_res";
import UserException from "../../utils/user_exception";
import isLoggedIn from "./../../utils/auth/is_logged_in";

// @route   POST todos
// @desc    adds a todo
// @access  Private
router.post("/", isLoggedIn, async (req, res) => {
    try {
        const { email } = req.user as IUser;
        const { todo } = req.body;
        // add todo to user and return updated user obj
        const data = await User.addTodo(email, todo);
        if (req.session) 
            req.session.passport.user = data?.user;
        res.status(200).json(data);
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

// @route   delete todos
// @desc    deletes a todo
// @access  Private
router.delete("/", isLoggedIn, async (req, res) => {
    try {
        const { email } = req.user as IUser;
        const { todo } = req.body;
        // delete todo to user and return updated user obj
        const data = await User.deleteTodo(email, todo);
        res.status(200).json(data);
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

// @route   PUT todo
// @desc    Toggles the done property (boolean) of a todo
// @access  Private
router.put("/", isLoggedIn, async (req, res) => {
    try {
        const { email } = req.user as IUser;
        const { todo } = req.body;
        // toggle todo of user and return updated user obj
        const data = await User.toggleTodoDone(email, todo);
        res.status(200).json(data);
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

// Removed for now
// @route   PUT todo/image
// @desc    Adds an image to a todo
// @access  Private
// router.put("/image", isLoggedIn, async (req, res) => {
//     try {
//         if (req.files) {
//             const image = req.files.image as UploadedFile;
//             const { email } = req.user as IUser;
//             storeImage(image.name, image.data);
//             res.status(200).json(returnRes(true, null, "file received", 200));
//         } else {
//             res.status(200).json(returnRes(false, null, "please provide an image", 400))
//         }
//     } catch (err) {
//         if (err instanceof UserException) {
//             // send error
//             res.status(200).json(returnRes(false, null, err.message, 400));
//         } else {
//             console.log(err);
//             // send unhandled error
//             res.status(500).json(
//                 returnRes(
//                     false,
//                     null,
//                     "Internal Server Error",
//                     500,
//                     `addTodo Error: ${err}`
//                 )
//             );
//         }
//     }
// });

module.exports = router;
