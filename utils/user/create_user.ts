import getUser from "./get_user";
import unmarshall from "../unmarshall";
import returnRes from "../return_res";
import dynamodb from "./../../db";
import UserException from "../user_exception";
import checkEmail from "../checks/check_email";
import checkString from "../checks/check_string";
import { TodoApiResponse } from "../../@types/todo_api_response";

/**
 *  Creates a user item in dynamo db
 *  @param {String} email a valid email eg. test@test.com
 *  @param {String} password a hashed string of the user's password
 *  @returns {Promise<TodoApiResponse>} standard todo api response
 */
const createUser = async (
    email: string,
    password: string
): Promise<TodoApiResponse> => {
    try {
        // check arguments
        checkEmail(email);
        checkString("password", password);

        // check for existing user with email
        const userData = await getUser(email);
        console.log(userData);
        // user already exists
        if (userData.status) {
            return returnRes(
                false,
                null,
                "user with that email already exists",
                400
            );
        } else {
            const params = {
                Item: {
                    email: {
                        S: email,
                    },
                    password: {
                        S: password,
                    },
                    todos: {
                        L: [
                            {
                                M: {
                                    id: { N: "0" },
                                    message: { S: "Make my first todo!!!" },
                                    done: { BOOL: false },
                                },
                            },
                        ],
                    },
                    nextTodoKey: {
                        N: "1",
                    },
                },
                ReturnConsumedCapacity: "TOTAL",
                TableName: "Users",
            };

            // create new user
            const data = await dynamodb.putItem(params).promise();
            // check for success
            if (
                data.ConsumedCapacity?.TableName === "Users" &&
                data.ConsumedCapacity.CapacityUnits === 1
            ) {
                delete params.Item.password;
                // return new user
                return returnRes(
                    true,
                    { user: unmarshall(params.Item) },
                    "user created",
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

export default createUser;
