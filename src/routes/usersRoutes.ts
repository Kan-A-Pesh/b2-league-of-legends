import express from "express";
import UsersController from "../controllers/usersController";

const router = express.Router();

router.post("/register", UsersController.register);
router.post("/login", UsersController.login);

export default router;
