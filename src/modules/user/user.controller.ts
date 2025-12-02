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

const getuser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
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
};

const getSingleuser = async (req: Request, res: Response) => {
  //catch id
  try {
    const result = await userServices.getSingleuser(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched Successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await userServices.updateuser(
      name,
      email,
      req.params.id as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated  Successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      detailes: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteuser(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const userControllers = {
  createUser,
  getuser,
  getSingleuser,
  updateUser,
  deleteUser,
};
