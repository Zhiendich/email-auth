import { Router } from "express";
import userController from "../contollers/userController.js";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware.js";
const router = Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activateToken);
router.get("/refresh", userController.refreshToken);
router.get("/users", authMiddleware, userController.getUsers);

export default router;
