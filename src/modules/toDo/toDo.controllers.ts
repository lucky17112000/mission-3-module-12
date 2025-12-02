import { pool } from "../../config/db";
import { Request, Response } from "express";
import { toDoservices } from "./toDoServices";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await toDoservices.createTodo(user_id, title);
    res.status(201).json({
      success: true,
      message: "Todos created",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getTodod = async (req: Request, res: Response) => {
  try {
    const result = await toDoservices.getTodo();
    console.log(result);

    res.status(200).json({
      success: true,
      message: "todos Retrived successfully",
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
const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const result = await toDoservices.getSingleTodo(req.params.id as string);
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
      success: true,
      message: err.message,
    });
  }
};
const updateTodo = async (req: Request, res: Response) => {
  try {
    const { is_completed } = req.body;
    const result = await toDoservices.updateTodo(
      is_completed,
      req.params.is as string
    );
    pool.query(`UPDATE todos SET is_completed=$1 WHERE id=$2 RETURNING *`, [
      is_completed,
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Update SuccessFully",
        detailes: result.rows[0],
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
const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await toDoservices.deleteTodo(req.params.id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Deleted Success Fully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const toDoControlers = {
  createTodo,
  getTodod,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
