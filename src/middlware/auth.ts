// higher order function  return korbe function k

import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { AuthRequest } from "../types/express";

// roles = ["admin", "user"]
const auth = (...roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(500).json({ message: "You are not allowed!!" });
      }
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;
      console.log({ decoded });
      req.user = decoded;
      console.log("from user", req.user);

      //["admin"]

      if (roles.length && !roles.includes(decoded.role as string)) {
        return res
          .status(403)
          .json({ message: "Your Are not allowed to access this resource" });
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
