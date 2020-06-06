import check from "check-types";
import _ from "lodash";
import UserException from "./../user_exception";

/**
 *  Helper function check if string is not null and a string type
 *  @param {String} name name of variable when error occurs
 *  @param {String} value the string you want to check
 *  @returns {Boolean} if string is valid
 */
const checkString = (name: string, value: string): boolean => {
    // check for value
    if (!value) throw new UserException(`please provide a ${name}`);
    // check for value type to be string
    if (!check.string(value)) throw new UserException(`${name} must be a string`);
    // check for empty string
    if (value.length === 0) throw new UserException(`please provide a ${name}`);
    // check for valid value
    return true;
};

export default checkString;
