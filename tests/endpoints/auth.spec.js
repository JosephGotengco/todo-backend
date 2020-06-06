const assert = require("assert");
const basicAccount = require("../resources/accounts").basic;
const baseUrl = require("../resources/urls").testingUrl;
const faker = require("faker");

describe("POST /auth", () => {
    it("should not be able to a login with email as an empty string", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: "",
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with an undefined email", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with email as a number", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: faker.random.number(),
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with email as an array", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: [basicAccount.email],
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with email as an object", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: { email: basicAccount.email },
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with email as a boolean", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: true,
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with email as a function", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: () => console.log("Hello 🎈"),
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with email as a symbol", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: Symbol("Symbol!"),
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with password as an empty string", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: basicAccount.email,
            password: "",
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with an undefined password", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: basicAccount.email,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with password as a number", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: basicAccount.email,
            password: faker.random.number(),
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with password as an array", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: basicAccount.email,
            password: [basicAccount.password],
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with password as an object", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: basicAccount.email,
            password: { password: basicAccount.password },
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with password as a boolean", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: basicAccount.email,
            password: true,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with password as a function", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: basicAccount.email,
            password: () => console.log("Hello 🎈"),
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to a login with password as a symbol", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/auth`, {
            email: basicAccount.email,
            password: Symbol("Symbol!"),
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 401);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "invalid email or password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it.skip("should be able to get a logged in user's data", async () => {
        // login
        loginRes = await login(basicAccount.email, basicAccount.password);
        sleep(1000);
        // make request
        const response = await agent.get(`${baseUrl}/users`);
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.msg, "user retrieved");
        assert.equal(response.data.code, 200);
        assert.equal(response.data.status, true);

        // check user data
        assert.equal(response.data.user.email, basicAccount.email);
        assert.equal(response.data.user.password, undefined);
        const userTodo = basicAccount.todos[0];
        assert.equal(response.data.user.todos[0].done, userTodo.done);
        assert.equal(response.data.user.todos[0].message, userTodo.message);
    });
});
