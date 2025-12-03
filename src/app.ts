import express, { Request, Response } from "express";

import config from "./config";
import initDb, { pool } from "./config/db";
import loger from "./middlware/logger";
import { userRoute } from "./modules/user/user.routes";
import { todoRouter } from "./modules/toDo/toDo.Routes";
import { authRouter } from "./modules/auth/auth.routes";

const app = express();

app.use(express.json()); // parser middlware
// app.use(express.urlencoded()); // for from data

initDb(); //initialize db from here

//logger middlware

app.get("/", loger, (req: Request, res: Response) => {
  res.send("Hello");
});
//users CRUD
app.use("/users", userRoute);

//todos crud

app.use("/todos", todoRouter);

//auth routes
app.use("/auth", authRouter);

//undefined route

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not found",
    path: req.path,
  });
});

export default app;

//package.json create kore server run kora
// trype setup kora lagbe
//tsconfig.json create kora lagbe
//nodemon setup kora lagbe development er jonno
//dotenv setup kora lagbe
//pg setup kora lagbe database er jonno
