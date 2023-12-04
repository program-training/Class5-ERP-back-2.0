import express from "express";
import {
  handleLogin,
  handleUserRegistration,
} from "../controller/authController";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/signup", handleUserRegistration);

export default router;
