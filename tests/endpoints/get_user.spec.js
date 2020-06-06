const assert = require("assert");
const basicAccount = require("../resources/accounts").basic;
const baseUrl = require("../resources/urls").testingUrl;

describe("GET /users", () => {
    it("should not be able to a logged in user's data", async () => {
        // make request
        const response = await agent.get(`${baseUrl}/users`);
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "please login again");
        // check user data
        assert.equal(response.data.user, undefined);
    });

    it("should be able to a logged in user's data", async () => {
        // login
        await login(basicAccount.email, basicAccount.password);
        // make request
        const response = await agent.get(`${baseUrl}/users`);
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        // sometimes flaky
        assert.equal(response.data.code, 200);
        assert.equal(response.data.status, true);
        assert.equal(response.data.msg, "user retrieved");
        // check user data
        assert.equal(response.data.user.email, basicAccount.email);
        assert.equal(response.data.user.password, undefined);
        const userTodo = basicAccount.todos[0];
        assert.equal(response.data.user.todos[0].done, userTodo.done);
        assert.equal(response.data.user.todos[0].message, userTodo.message);
    });
});
