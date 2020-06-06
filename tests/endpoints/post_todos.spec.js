const basicAccount = require("../resources/accounts").basic;
const baseUrl = require("../resources/urls").testingUrl;

describe("POST /todos", () => {
    const TEST_TODO = {
        message: "test /todos endpoint",
        done: false,
    };

    beforeAll(async () => {
        // login
        const authResponse = await login(
            basicAccount.email,
            basicAccount.password
        );

        // delete TEST_TODO if it already exists
        if (
            authResponse.data.user.todos.some(
                (e) => e.message === TEST_TODO.message
            )
        ) {
            await agent.delete(`${baseUrl}/todos`, {
                data: {
                    todo: TEST_TODO,
                },
            });
        }
    });

    it("should be able to add a new todo", async () => {
        login(basicAccount.email, basicAccount.password);
        // add todo
        const response = await agent.post(`${baseUrl}/todos`, {
            todo: TEST_TODO,
        });
        sleep(2000);
        // sometimes flaky
        expect(response.data.status).toBeTruthy();
        expect(
            response.data.user.todos.some(
                (e) => e.message === TEST_TODO.message
            )
        ).toBeTruthy();
    });

    it("should not be able to add a todo without a message", async () => {
        const WITHOUT_MSG = {
            done: false,
        };
        // add todo
        const response = await agent.post(`${baseUrl}/todos`, {
            todo: WITHOUT_MSG,
        });
        expect(response.data.user).toBeUndefined();
        expect(response.data.msg).toBe(
            "todo object must contain 'message' property"
        );
        expect(response.data.code).toBe(400);
    });

    it("should not be able to add a todo without specifying done", async () => {
        const WITHOUT_MSG = {
            message: "test /todos endpoint",
        };
        // add todo
        const response = await agent.post(`${baseUrl}/todos`, {
            todo: WITHOUT_MSG,
        });
        expect(response.data.user).toBeUndefined();
        expect(response.data.msg).toBe(
            "todo object must contain 'done' property"
        );
        expect(response.data.code).toBe(400);
    });

    it("should not be able to add a todo without specifying any todo properties", async () => {
        // add todo
        const response = await agent.post(`${baseUrl}/todos`, { todo: {} });
        expect(response.data.user).toBeUndefined();
        expect(response.data.msg).toBe(
            "todo object must contain 'message' property"
        );
        expect(response.data.code).toBe(400);
    });

    it("should not be able to add a todo without a todo", async () => {
        // add todo
        const response = await agent.post(`${baseUrl}/todos`, {});
        expect(response.data.user).toBeUndefined();
        expect(response.data.msg).toBe("please provide a todo");
        expect(response.data.code).toBe(400);
    });

    it("should not be able to add a todo having keys besides message and done", async () => {
        // add todo
        const response = await agent.post(`${baseUrl}/todos`, {
            todo: {
                ...TEST_TODO,
                extraProp: "I hope I don't get caught!",
            },
        });
        expect(response.data.user).toBeUndefined();
        expect(response.data.msg).toBe(
            "todo object can only contain message (string) and done (boolean)"
        );
        expect(response.data.code).toBe(400);
    });
});
