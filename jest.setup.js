const axios = require("axios");
const adapter = require("axios/lib/adapters/http");
const baseUrl = require("./tests/resources/urls")["testingUrl"];
const login = require("./tests/helpers/login");

// configure test timeout
jest.setTimeout(10000);
// configure a http agent to keep sessions alive (via adapter)
global.agent = axios.create({ baseUrl, adapter });
global.faker = require("faker");
global.login = login;
global.sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
};
