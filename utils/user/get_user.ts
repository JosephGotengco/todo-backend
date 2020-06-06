import unmarshall from "../unmarshall";
import returnRes from "../return_res";
import _ from "lodash";
import dynamodb from "./../../db";
import checkEmail from "../checks/check_email";
import { TodoApiResponse } from "../../@types/todo_api_response";

/**
 *  Gets a user item in dynamodb
 *  @param {String} email a valid email eg. test@test.com
 *  @returns {Promise<TodoApiResponse>} standard todo api response
 */
const getUser = async (email: string): Promise<TodoApiResponse> => {
    // check arguments
    checkEmail(email);

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
    if (!data.Item) {
        // if there's no user with that email
        return returnRes(false, null, "cannot find user", 400);
    } else {
        // turn to regular JS object
        const user = unmarshall(data.Item);
        return returnRes(true, { user }, "user retrieved", 200);
    }
};

export default getUser;
