import jwt from "jsonwebtoken";
import { customError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(customError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(customError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};
