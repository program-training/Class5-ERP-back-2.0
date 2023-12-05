import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../auth/model/jwt/jwt";
import { BaseContext } from "@apollo/server";
import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { GraphQLError } from "graphql";
import { decode } from "jsonwebtoken";

export const requireAuth = ({
  req,
}: StandaloneServerContextFunctionArgument): Promise<BaseContext> => {
  console.log((req as Request).body.operationName);
  if (
    (req as Request).body.operationName === "GetUsers" ||
    (req as Request).body.operationName === "loginUser" ||
    (req as Request).body.operationName === "RegisterUser" ||
    (req as Request).body.operationName === "IntrospectionQuery" 
  )
    return null as unknown as Promise<BaseContext>;
  const authToken = req.headers["authorization"] || "";
  const token = decode(authToken);
  if (!verifyToken(authToken)) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
  return token as Promise<BaseContext>;
};
