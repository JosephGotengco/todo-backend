import httpStatusCode from "./../constants/http_status_codes";
import { TodoApiResponse } from "../@types/todo_api_response";

/**
 *  Used to return a consistent api response
 *  @param {Boolean} status a valid email eg. test@test.com
 *  @param {Any} any an object of data that needs to be returned
 *  @param {String} msg an object of data that needs to be returned
 *  @param {httpStatusCode} code a http status code
 *  @param {String} devMsg a message for developers todo: remove this
 *  @returns {Promise<TodoApiResponse>} standard todo api response
 */
const returnRes = (
    status: boolean,
    data: any,
    msg: string,
    code: httpStatusCode,
    devMsg?: string
): TodoApiResponse  => {
    data = data || {};
    devMsg = devMsg || "No developer message 😭";
    if (typeof status !== "boolean" || !msg) {
        return {
            status: false,
            errStack: new Error().stack,
            msg: "Internal Server Error",
            code,
        };
    } else {
        return {
            status,
            ...data,
            msg,
            code,
        };
    }
};

export default returnRes;
