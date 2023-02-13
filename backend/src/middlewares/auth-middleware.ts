import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error.js";
import { UserRequest } from "../models/User.js";
import tokenServices from "../services/token-services.js";

export default async function (
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnAuthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnAuthorizedError());
    }
    const userData = await tokenServices.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnAuthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnAuthorizedError());
  }
}
