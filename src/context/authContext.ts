import jwt from "jsonwebtoken";
import db from "../models";

export const createAuthContext = async ({ req }: any) => {
  const token = req.headers.authorization || "";
  const TokenArray = token.split(" ");
  const decodedToken = jwt.decode(TokenArray[1]) as {
    userId: number;
    email: string;
  };

  const userId = decodedToken
    ? {
        id: decodedToken.userId,
      }
    : null;

  if (userId != null) {
    const user = await db.User.findOne({
      where: {
        id: userId.id,
      },
    });

    return { user };
  }
};
