import * as dynamoDbLib from "./library/dynamodb-lib";
import { success, failure } from "./library/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        todoId: event.pathParameters.id
      }
  };

  try {
    const returnObj = await dynamoDbLib.dbAPI("get", params);
    console.log(returnObj);
    if (returnObj.Item) {
        console.log(returnObj.Item);
        return success(returnObj.Item);
    } else {
        return failure({ status: false, error: "Item Not Found."});
    }
  } catch (e) {
    return failure({ status: false });
  }
}