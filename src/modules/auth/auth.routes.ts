import { Router } from "express";
import { authControllers } from "./auth.controllers";
const router = Router();
//locaqlhost:5000/auth/login
router.post("/login", authControllers.loginUser);

export const authRouter = router;
