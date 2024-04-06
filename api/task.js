import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
const client = new DynamoDBClient({ region: "us-west-1" });

const docClient = DynamoDBDocumentClient.from(client);

export const fetchTasks = async () => {
  const conmmand = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name, completed",
    TableName: "Tasks",
  });

  const response = await docClient.send(command);

  return response;
};

export const createTasks = async () => {
  const uniqueId = crypto.randomUUID();

  const conmmand = new PutCommand({
    TableName: "Tasks",
    Item: {
      id: uniqueId,
      name,
      completed,
    },
  });

  const response = await docClient.send(command);

  return response;
};

export const updateTasks = async ({ id, name, completed }) => {
  const conmmand = new UpdateCommand({
    TableName: "Tasks",
    Key: {
      id,
    },
    ExpressionAttributeNames: {
      "#name": "name",
    },
    UpdateExpression: "set name = :n, completed = :c",
    ExpressionAttributeValues: {
      ":n": name,
      ":c": complete,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);

  return response;
};

export const deleteTasks = async (id) => {
  const conmmand = new DeleteCommand({
    TableName: "Tasks",
    Key: { id },
  });

  const response = await docClient.send(command);

  return response;
};
