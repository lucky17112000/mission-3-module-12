import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

//higer order function it return a function
const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log("auth token", token);
    //verify token here
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "you are not allowed",
      });
    }
    const decode = jwt.verify(token, config.jwtSecret as string);
    console.log("decoded : ", decode);
    next();
  };
};
export default auth;
