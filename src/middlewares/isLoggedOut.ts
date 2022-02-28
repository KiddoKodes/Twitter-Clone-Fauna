import { NextFunction /* Next Function is a type for next() */, Request, Response } from "express"

// This function checks if the request does not have a faunasecret as header.
export const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.faunasecret) {
        next();
    }
    else {
        res.status(400).send({ code: "BAD_REQUEST", message: "User Already Logged In" })
    }
}