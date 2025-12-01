import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const port = 5000;

//parser
app.use(express.json()); //middlware
// app.use(express.urlencoded()); // for from data

//pool create
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

const initDb = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name  VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        age INT,
        phone VARCHAR(15),
        adress TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255),
        description TEXT,
        is_completed BOOLEAN DEFAULT FALSE,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )`);
};
initDb();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

//users CRUD
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email]
    );
    // console.log(result.rows[0]);
    res.status(201).json({
      success: false,
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
});

app.get("/users", async (req: Request, res: Response) => {
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

app.get("/users/:id", async (req: Request, res: Response) => {
  //catch id
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
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
      success: false,
      message: err.message,
    });
  }
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
