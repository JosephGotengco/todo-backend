const assert = require("assert");
const basicAccount = require("../resources/accounts").basic;
const baseUrl = require("../resources/urls").testingUrl;

describe("POST /users", () => {
    it("should not be able to create a user with email as an empty string", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: "",
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "please provide a email");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with an undefined email", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "please provide a email");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with email as a number", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: faker.random.number(),
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "email must be a string");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with email as an array", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: [basicAccount.email],
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "email must be a string");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with email as an object", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: { email: basicAccount.email },
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "email must be a string");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with email as a boolean", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: true,
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "email must be a string");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with email as a function", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: () => console.log("Hello 🎈"),
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "please provide a email");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with email as a symbol", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: Symbol("Symbol!"),
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "please provide a email");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with password as an empty string", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: basicAccount.email,
            password: "",
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "please provide a password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with an undefined password", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: basicAccount.email,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "please provide a password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    // abc

    it("should not be able to create a user with password as a number", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: basicAccount.email,
            password: faker.random.number(),
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "password must be a string");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with password as an array", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: basicAccount.email,
            password: [basicAccount.password],
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "password must be a string");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with password as an object", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: basicAccount.email,
            password: { password: basicAccount.password },
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "password must be a string");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with password as a boolean", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: basicAccount.email,
            password: true,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "password must be a string");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with password as a function", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: basicAccount.email,
            password: () => console.log("Hello 🎈"),
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "please provide a password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should not be able to create a user with password as a symbol", async () => {
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: basicAccount.email,
            password: Symbol("Symbol!"),
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.code, 400);
        assert.equal(response.data.status, false);
        assert.equal(response.data.msg, "please provide a password");

        // check for no user data
        assert.equal(response.data.user, undefined);
    });

    it("should be able to make a new user", async () => {
        await login(basicAccount.email, basicAccount.password);
        const deleteRes = await agent.delete(`${baseUrl}/users`);
        // make request
        const response = await agent.post(`${baseUrl}/users`, {
            email: basicAccount.email,
            password: basicAccount.password,
        });
        // check http status
        assert.equal(response.status, 200);
        // check standard todo-api response format
        assert.equal(response.data.msg, "user created");
        assert.equal(response.data.code, 200);
        assert.equal(response.data.status, true);

        // check for no user data
        assert.equal(response.data.user.email, basicAccount.email);
        assert.equal(
            response.data.user.todos[0].message,
            "Make my first todo!!!"
        );
        assert.equal(response.data.user.todos[0].done, false);
    });
});
