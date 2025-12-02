import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./users.service";

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await userServices.createUser(name, email);
    // console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "Data Instered Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    // console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const userControllers = { createUser };
