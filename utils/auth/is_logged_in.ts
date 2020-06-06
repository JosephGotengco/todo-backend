import returnRes from "../return_res";

const isLoggedIn = (req: any, res: any, next: any) => {
    if (req.user) {
        next();
    } else {
        res.status(200).json(returnRes(false, null, "please login again", 401));
    }
};

export default isLoggedIn;
