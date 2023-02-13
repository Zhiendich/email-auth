import { NextFunction, Request, Response } from "express";
import userServices from "../services/user-services.js";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";
import User from "../models/User.js";

dotenv.config();

class userController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка при валидации", errors));
      }
      const { email, password } = req.body;
      const userData = await userServices.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userServices.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userServices.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async activateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await userServices.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL || "");
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userServices.refresh(refreshToken);
      if (userData) {
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.json(userData);
      }
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userServices.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new userController();
