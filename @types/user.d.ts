declare module "user";
import Todos = require("todos");
import { Todos } from "./todos";

export interface User {
	email: string;
	password: string;
	todos: Todos;
	nextTodoKey: number;
}
