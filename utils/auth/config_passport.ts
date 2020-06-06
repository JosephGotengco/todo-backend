import { User as IUser } from "../../@types/user";
import * as passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import User from "../user";

module.exports = (passport: any) => {
    passport.serializeUser(
        (user: IUser, done: (arg0: null, arg1: IUser) => void) => {
            done(null, user);
        }
    );

    passport.deserializeUser(
        (user: IUser, done: (arg0: null, arg1: IUser) => void) => {
            done(null, user);
        }
    );

    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            async (
                username: string,
                password: string,
                done: (arg0: any, arg1: IUser | boolean) => void
            ) => {
                try {
                    const data = await User.getUser(username);
					const user: IUser = data.user as IUser;
                    const authenticated = await User.authenticateUser(username, password);
                    delete user.password;
                    if (authenticated) {
                        done(null, user);
					} else {
						done(null, false);
					}
				} catch (err) {
					console.log(err);
					done(null, false);
				}
            }
        )
    );
};
