import AWS from "aws-sdk";

// config
const credentials = new AWS.SharedIniFileCredentials({
    profile: "todo-project-user",
});

AWS.config.update({
    region: "us-west-2",
    credentials,
});

const startDb = () => {
    // setup
    const db = new AWS.DynamoDB();
    return db;
};

export default startDb();
