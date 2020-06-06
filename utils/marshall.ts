import AWS from "aws-sdk";

// shorthanded version of marshall
const marshall = (data: any) => AWS.DynamoDB.Converter.marshall(data);
export default marshall;
