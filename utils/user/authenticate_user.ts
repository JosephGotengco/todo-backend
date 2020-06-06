import unmarshall from "../unmarshall";
import dynamodb from "./../../db";
import checkEmail from "../checks/check_email";
import checkString from "../checks/check_string";
import comparePassword from "../auth/compare_password";
import UserException from "../user_exception";

/**
 *  Authenticates a user
 *  @param {String} email a valid email eg. test@test.com
 *  @param {String} password the password from the user
 *  @returns {Promise<TodoApiResponse>} standard todo api response
 */
const authenticateUser = async (email: string, password: string): Promise<boolean> => {
    // check arguments
	checkEmail(email);
	checkString("password", password);

    const params = {
        Key: {
            email: {
                S: email,
            },
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: "Users",
    };
    // get user from db
	const data = await dynamodb.getItem(params).promise();
	if (data.Item) {
        const user = unmarshall(data.Item);
		return await comparePassword(password, user.password);
	} else {
		throw new UserException("invalid email or password");
	}
};

export default authenticateUser;
