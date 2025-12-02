import express, { Request, Response } from "express";

import config from "./config";
import initDb, { pool } from "./config/db";
import loger from "./middlware/logger";
import { userRoute } from "./modules/user/user.routes";
import { todoRouter } from "./modules/toDo/toDo.Routes";

const app = express();
const port = config.port;

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

//undefined route

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
