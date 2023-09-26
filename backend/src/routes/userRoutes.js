import { Router } from "express";
import {
  createUserController,
  loginController,
  updateUserInfoController,
  deleteUserController,
} from "../controllers/userController";
import validateToken from "../../middleware";
const userRoutes = Router();

userRoutes.post("/login", loginController);
userRoutes.post("/createUser", createUserController);
userRoutes.delete("/delete", validateToken, deleteUserController);
userRoutes.patch("/update-users", validateToken, updateUserInfoController);

export default userRoutes;
