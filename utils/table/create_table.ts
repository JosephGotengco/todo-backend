import dynamodb from "./../../db";

const USER_TABLE_PARAMS = {
    TableName: "Users",
    KeySchema: [
        { AttributeName: "email", KeyType: "HASH" }, // Partition key
    ],
    AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
};

/**
 * Creates users dynamodb tables
 */
const createTable = async () => {
    try {
        // create dynamodb table
        const data = await dynamodb.createTable(USER_TABLE_PARAMS).promise();
        console.log("Created table. Table description JSON:", data);
    } catch (err) {
        // log error
        console.log("Error", err.message);
    }
};

createTable()

export default createTable;
