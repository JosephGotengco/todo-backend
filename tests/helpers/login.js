const baseUrl = require("./../resources/urls")["testingUrl"];

module.exports = async (email, password) => {
    // attemps to login
    let authResponse = await agent.post(`${baseUrl}/auth`, {
        email,
        password,
    });

    if (authResponse.data.status) {
		// set cookie to header for future usage
        const cookie = authResponse.headers["set-cookie"][0];
        agent.defaults.headers.Cookie = cookie;
        return authResponse;
    } else {
        // make user
        await agent.post(`${baseUrl}/users`, {
            email,
            password,
        });
        // login again
        authResponse = await agent.post(`${baseUrl}/auth`, {
            email,
            password,
        });
        const cookie = authResponse.headers["set-cookie"][0];
        agent.defaults.headers.Cookie = cookie;
        return authResponse;
    }
};
