import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
const router = express.Router();
//localhost:5000/
//app.use("/users" , userRouter)
//create
router.post("/", userControllers.createUser);

//all user

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "Users Retrived successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      detailes: err,
    });
  }
});

export const userRoute = router;
