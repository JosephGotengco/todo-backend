import bcrypt from "bcryptjs";
import checkString from "../checks/check_string";

/**
 *  Returns if password string and hashed string are the same
 *  @param {String} password the password string from the user
 *  @param {String} hashedPassword the hashed password string from the database
 *  @returns {Promise<boolean>} the result of if the password string being hashed matches the hashed string in database
 */
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    checkString("password", password);
    checkString("hashed password", hashedPassword);
    const passwordsAreSame = await bcrypt.compare(password, hashedPassword);
    return passwordsAreSame;
};

export default comparePassword;
