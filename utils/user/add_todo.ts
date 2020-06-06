import User from "./";
import { Todo } from "../../@types/todos";
import checkEmail from "../checks/check_email";
import checkTodo from "../checks/check_todo";
import UserException from "../user_exception";
import returnRes from "../return_res";
import dynamodb from "./../../db";
import marshall from "../marshall";
import checkString from "../checks/check_string";

/**
 *  Adds a todo object to a user with email specified
 *  @param {String} email a valid email eg. test@test.com
 *  @param {Object} todo a todo object
 *  @param {String} todo.message the todo's message
 *  @param {Boolean} todo.done whether or not the todo is completed
 *  @returns {TodoApiResponse} standard todo api response
 */
const addTodo = async (email: string, todo: Todo) => {
    try {
        // check arguments
        checkEmail(email);
        checkTodo(todo);

        const { user } = await User.getUser(email);
        if (!user)
            // if user doesn't exist
            throw new UserException("cannot find user");
        if (!user.todos)
            // if user doesn't have a todos array
            user.todos = [];
        user.todos.forEach((e: Todo) => {
            // check if a todo exists with the same message
            if (e.message === todo.message)
                throw new UserException(
                    `the todo '${todo.message}' already exists`
                );
        });
        // add todo object to user and return user
        todo.id = user.nextTodoKey;
        user.todos.push(todo);
        user.nextTodoKey = user.nextTodoKey + 1;
        const marshalledUser = marshall(user);
        const params = {
            Item: {
                ...marshalledUser
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: "Users",
        };
        await dynamodb.putItem(params).promise();
        const data = await User.getUser(email);
        if (data.user) {
            delete data.user.password;
            data.msg = "todo successfully added";
            return data;
        } else {
            returnRes(false, null, "error adding a todo", 500);
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
                "there was an error adding the todo",
                500
            );
        }
    }
};

export default addTodo;
