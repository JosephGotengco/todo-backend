import getUser from "./get_user";
import returnRes from "../return_res";
import dynamodb from "../../db";
import UserException from "../user_exception";
import checkEmail from "../checks/check_email";
import { TodoApiResponse } from "../../@types/todo_api_response";

/**
 *  Deletes a user item in dynamo db
 *  @param {String} email a valid email eg. test@test.com
 *  @returns {Promise<TodoApiResponse>} standard todo api response
 */
const deleteUser = async (
    email: string
): Promise<TodoApiResponse> => {
    try {
        // check arguments
        checkEmail(email);

        // check for existing user with email
        const userData = await getUser(email);
        // cannot find user to delete
        if (!userData.status)
            return returnRes(
                false,
                null,
                "cannot find user",
                400
            );

        const params = {
            Key: {
                email: {
                    S: email,
                },
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: "Users",
        };

        // delete user
		const data = await dynamodb.deleteItem(params).promise();
        // check for success
        if (
            data.ConsumedCapacity?.TableName === "Users" &&
            data.ConsumedCapacity.CapacityUnits === 1
        ) {
            // return new user
            return returnRes(
                true,
                null,
                "user deleted",
                200
            );
        } else {
            // return unhandled error
            return returnRes(
                false,
                null,
                "there was an error creating your account",
                500
            );
        }
    } catch (err) {
        if (err instanceof UserException) {
            // pass on error to caller
            throw new UserException(err.message);
        } else {
            console.log(err);
            return returnRes(
                false,
                null,
                "there was an error creating your accoun",
                500
            );
        }
    }
};

export default deleteUser;
