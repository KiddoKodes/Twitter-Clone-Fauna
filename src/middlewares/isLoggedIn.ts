import {
  NextFunction /* Next Function is a type for next() */,
  Request,
  Response,
} from "express";

// This function checks if the request has a faunasecret as header.
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.faunasecret) {
    next();
  } else {
    res
      .status(400)
      .send({ code: "BAD_REQUEST", message: "User is not logged in" });
  }
};
