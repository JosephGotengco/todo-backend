const assert = require("assert");
const basicAccount = require("../resources/accounts").basic;
const baseUrl = require("../resources/urls").testingUrl;

describe("DELETE /users", () => {
    it("should not be able to delete user while not logged in", async () => {
        // make request
        const response = await agent.delete(`${baseUrl}/users`);
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "please login again");
        // check user data
        assert.equal(response.data.user, undefined);
    });

    it("should be able to delete user account", async () => {
        // login
        await login(basicAccount.email, basicAccount.password);
        // make request
        const response = await agent.delete(`${baseUrl}/users`);
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 200);
        assert.equal(response.data.status, true);
        assert.equal(response.data.msg, "account deleted and logged out");
        // check user data
        assert.equal(response.data.user, undefined);

    });
});
