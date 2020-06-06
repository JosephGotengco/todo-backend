import emailValidator from "email-validator";
import _ from "lodash";
import UserException from "../user_exception";
import checkString from "./check_string";

/**
 *  Helper function check if email is not null, a string, and valid
 *  @param {String} email a valid email eg. test@test.com
 *  @returns {Boolean} if the email is valid
 */
const checkEmail = (email: string): boolean => {
	// check for email
	// check for email type to be string
	checkString("email", email);
	// check for valid email
	if (!emailValidator.validate(email))
		throw new UserException("please provide a valid email");
	return true;
}

export default checkEmail;
