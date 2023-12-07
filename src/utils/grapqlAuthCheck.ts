import { GraphQLError } from "graphql";
import { verifyToken } from "../auth/model/jwt/jwt";

export const graphQlAuthCheck = (token: string) => {
  if (!verifyToken(token)) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};
