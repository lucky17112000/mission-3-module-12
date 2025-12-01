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
        age INT NOT NULL,
        phone VARCHAR(15),
        adress TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()


        
        
        )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS todos(
    
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
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
app.post("/", (req: Request, res: Response) => {
  // res.send("Post request received")
  console.log(req.body);
  res.status(201).json({ message: "Success True" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
