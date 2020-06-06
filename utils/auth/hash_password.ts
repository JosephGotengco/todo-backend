import bcrypt from "bcryptjs";
import config from "config";
import checkString from "../checks/check_string";

const saltRounds: number = parseInt(process.env.salt_rounds!);

/**
 *  Returns the hashed version of a password
 *  @param {String} password the password string you want hashed
 *  @returns {Promise<string>} a promise returning the hashed password
 */
const hashPassword = async (password: string): Promise<string> => {
    checkString("password", password);
    // create salt
    const salt = await bcrypt.genSaltSync(saltRounds);
    // hash password and return it
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export default hashPassword;
