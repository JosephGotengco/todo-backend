import AWS from "aws-sdk";

// config
AWS.config.update({
    region: "us-west-2",
    credentials: {
        accessKeyId: process.env.aws_key!,
        secretAccessKey: process.env.aws_secret!,
    },
});

const startDb = () => {
    // setup
    const db = new AWS.DynamoDB();
    return db;
};

export default startDb();
