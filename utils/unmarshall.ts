import AWS from "aws-sdk";

// shorthanded version of unmarshall
const unmarshall = (data: any) => AWS.DynamoDB.Converter.unmarshall(data);
export default unmarshall;
