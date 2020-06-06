const assert = require("assert");
const basicAccount = require("../resources/accounts").basic;
const baseUrl = require("../resources/urls").testingUrl;

const TEST_TODO = {
    message: "Make my first todo!!!",
    done: false,
};

describe("DELETE /todos", () => {
    describe("while not logged in", () => {
        it("should not be able to delete todo while logged out", async () => {
            // make request
            const response = await agent.delete(`${baseUrl}/todos`, {
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

        it("should not be able to delete todo without a message property", async () => {
            // make request
            const response = await agent.delete(`${baseUrl}/todos`, {
                data: {
                    todo: {
                        done: TEST_TODO.done,
                    },
                },
            });
            // check http status
            assert.equal(response.status, 200);
            // check standard todo-api response format
            assert.equal(response.data.code, 400);
            assert.equal(response.data.status, false);
            assert.equal(
                response.data.msg,
                "todo object must contain 'message' property"
            );
            // check user data
            assert.equal(response.data.user, undefined);
        });

        it("should not be able to delete todo without a done property", async () => {
            // make request
            const response = await agent.delete(`${baseUrl}/todos`, {
                data: {
                    todo: {
                        message: TEST_TODO.message,
                    },
                },
            });
            // check http status
            assert.equal(response.status, 200);
            // check standard todo-api response format
            assert.equal(response.data.code, 400);
            assert.equal(response.data.status, false);
            assert.equal(
                response.data.msg,
                "todo object must contain 'done' property"
            );
            // check user data
            assert.equal(response.data.user, undefined);
        });

        it("should not be able to delete todo without a providing a todo", async () => {
            // make request
            const response = await agent.delete(`${baseUrl}/todos`, {
                data: {},
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
