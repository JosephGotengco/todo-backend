import check from "check-types";
import _ from "lodash";
import { Todo } from "../../@types/todos";
import UserException from "../user_exception";

/**
 *  Helper function check if todo is an object and message and done properties are valid
 *  @param {Object} todo a todo object
 *  @param {String} todo.message the todo's message
 *  @param {Boolean} todo.done whether or not the todo is completed
 *  @returns {Boolean} if todo is valid
 */
const checkTodo = (todo: Todo): boolean => {
    // check for todo
    if (!todo) throw new UserException("please provide a todo");
    // check for todo type to be object
    if (!check.object(todo))
        throw new UserException("todo must be a valid JavaScript object");
    // check todo object to have message property
    if (!_.has(todo, "message"))
        throw new UserException("todo object must contain 'message' property");
    // check todo object to have done property
    if (!_.has(todo, "done"))
        throw new UserException("todo object must contain 'done' property");
    // check todo.message to be a string
    if (!check.string(todo.message))
        throw new UserException("todo message must be a string");
    // check for empty string
    if (todo.message.length === 0)
        throw new UserException(`please provide a ToDo`);
    // check todo.done to be a boolean
    if (!check.boolean(todo.done))
        throw new UserException("todo.message must be a boolean");
    // check todo object to only have message and done property
    if (Object.keys(todo).length !== 2)
        throw new UserException(
            "todo object can only contain message (string) and done (boolean)"
        );
    return true;
};

export default checkTodo;
