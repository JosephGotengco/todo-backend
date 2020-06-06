const assert = require("assert");
const basicAccount = require("../resources/accounts").basic;
const baseUrl = require("../resources/urls").testingUrl;

const TEST_TODO = {
    message: "Make my first todo!!!",
    done: false,
};

describe("PUT /todos", () => {
    describe("while not logged in", () => {
        it("should not be able to update todo while logged out", async () => {
            // make request
            const response = await agent.put(`${baseUrl}/todos`, {
                data: {
                    todo: TEST_TODO,
                },
            });
            // check http status
            assert.equal(response.status, 200);
            // check standard todo-api response format
            assert.equal(response.data.code, 401);
            assert.equal(response.data.status, false);
            assert.equal(response.data.msg, "please login again");
            // check user data
            assert.equal(response.data.user, undefined);
        });
    });

    describe("while logged in", () => {
        beforeAll(async () => {
            // login
            await login(basicAccount.email, basicAccount.password);
        });

        it("should not be able to update todo without a message property", async () => {
            // make request
            const response = await agent.put(`${baseUrl}/todos`, {
                todo: TEST_TODO,
            });
            // check http status
            assert.equal(response.status, 200);
            // check standard todo-api response format
            assert.equal(
                response.data.msg,
                "todo object must contain 'message' property"
            );
            assert.equal(response.data.code, 400);
            assert.equal(response.data.status, false);
            // check user data
            assert.equal(response.data.user, undefined);
        });

        it("should not be able to update todo without a done property", async () => {
            // make request
            const response = await agent.put(`${baseUrl}/todos`, {
                todo: TEST_TODO,
            });
            // check http status
            assert.equal(response.status, 200);
            // check standard todo-api response format
            assert.equal(
                response.data.msg,
                "todo object must contain 'done' property"
            );
            assert.equal(response.data.code, 400);
            assert.equal(response.data.status, false);
            // check user data
            assert.equal(response.data.user, undefined);
        });

        it("should not be able to update todo without a providing a todo", async () => {
            // make request
            const response = await agent.put(`${baseUrl}/todos`, {
                data: {
                    todo: TEST_TODO,
                },
            });
            // check http status
            assert.equal(response.status, 200);
            // check standard todo-api response format
            assert.equal(response.data.code, 400);
            assert.equal(response.data.status, false);
            assert.equal(response.data.msg, "please provide a todo");
            // check user data
            assert.equal(response.data.user, undefined);
        });
    });
});
