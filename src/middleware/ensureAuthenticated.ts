import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, "d28a5fc1-68d5-4910-a49c-06b3114e5102");

    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Token invalid",
    });
  }
}
