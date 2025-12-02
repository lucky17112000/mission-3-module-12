import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
const router = express.Router();
//localhost:5000/
//app.use("/users" , userRouter)
//create
router.post("/", userControllers.createUser);

//all user

router.get("/", userControllers.getuser);
router.get("/:id", userControllers.getSingleuser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export const userRoute = router;
