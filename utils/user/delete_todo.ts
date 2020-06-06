import User from "./";
import { Todo } from "../../@types/todos";
import checkEmail from "../checks/check_email";
import checkTodo from "../checks/check_todo";
import UserException from "../user_exception";
import returnRes from "../return_res";
import dynamodb from "./../../db";
import marshall from "../marshall";

/**
 *  Adds a todo object to a user with email specified
 *  @param {String} email a valid email eg. test@test.com
 *  @param {Object} todo a todo object
 *  @param {String} todo.message the todo's message
 *  @param {Boolean} todo.done whether or not the todo is completed
 *  @returns {TodoApiResponse} standard todo api response
 */
const deleteTodo = async (email: string, todo: Todo) => {
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

        // check if todo exists in user's todos
        const todoExists = user.todos.some(
            (e: Todo) => e.message === todo.message
        );
        if (!todoExists) throw new UserException(`cannot find todo`);
        // remove todo object to user and return user
        user.todos = user.todos.filter((e: Todo) => e.message !== todo.message);
        const marshalledUser = marshall(user);
        const params = {
            Item: {
                ...marshalledUser,
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: "Users",
        };
        await dynamodb.putItem(params).promise();
        const data = await User.getUser(email);
        if (data.user) {
            delete data.user.password;
            data.msg = "todo successfully deleted";
            return data;
        } else {
            returnRes(false, null, "Error adding a todo", 500);
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

export default deleteTodo;
