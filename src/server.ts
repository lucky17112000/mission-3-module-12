import express, { Request, Response } from "express";

import config from "./config";
import initDb, { pool } from "./config/db";
import loger from "./middlware/logger";
import { userRoute } from "./modules/user/user.routes";

const app = express();
const port = config.port;

//parser
app.use(express.json()); //middlware
// app.use(express.urlencoded()); // for from data

//initialize db from here

initDb();

//logger middlware

app.get("/", loger, (req: Request, res: Response) => {
  res.send("Hello");
});
//users CRUD
app.use("/users", userRoute);

app.put("/users/:id", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET name=$1 , email=$2 WHERE id=$3 RETURNING *`,
      [name, email, req.params.id]
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
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [
      req.params.id,
    ]);

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
});
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [
      req.params.id,
    ]);
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
});

//todos crud

app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id , title)  VALUES($1 , $2 )  RETURNING * `,
      [user_id, title]
    );
    res.status(201).json({
      success: true,
      message: "Todos created",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
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
});

app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT* FROM todos WHERE id= $1`, [
      req.params.id,
    ]);
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
});

app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { is_completed } = req.body;
    const result = await pool.query(
      `UPDATE todos SET is_completed=$1 WHERE id=$2 RETURNING *`,
      [is_completed, req.params.id]
    );

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
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//package.json create kore server run kora
// trype setup kora lagbe
//tsconfig.json create kora lagbe
//nodemon setup kora lagbe development er jonno
//dotenv setup kora lagbe
//pg setup kora lagbe database er jonno
