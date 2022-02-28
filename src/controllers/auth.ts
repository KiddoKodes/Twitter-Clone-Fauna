import { FaunaError } from "../errors/FaunaErrors";
import { errors } from "faunadb";
import { Initialize, Query } from "../db/faunaDB";
import { Request, Response } from "express";

const { Call, Function: Fn } = Query;
const FaunaDB = Initialize(); // FaunaDB is being initialized as server because auth is managed by the server;
export const Signup = async (req: Request, res: Response) => {
  const { name, username, password, email, phone } = req.body;
  console.log(req.body);
  //checking if all fields are there.
  if (!name || !username || !password || (!email && !phone))
    return res.status(400).send({
      code: "INVALID_REQUEST",
      message: "Please fill the form correctly",
    });
  try {
    //Calling the function NewUser. For more info visit fauna dashboard..
    //The object literals frame the object in a way that the email will be null if user signups with phone or vice-versa
    const result = await FaunaDB.query(
      Call(Fn("NewUser"), [
        {
          username,
          name,
          email: email ? email : null,
          phone: phone ? phone : null,
        },
        password,
        email ? "email" : "phone",
      ])
    );

    return res.status(200).send(result);
  } catch (e) {
    //This is the error handling method in all catch blocks e is typecasted because of typescript strict mode. To remove this, turn strict to false in tsconfig.json
    let Error = new FaunaError(e as errors.FaunaHTTPError);
    return res.status(Error.statusCode).send(Error);
  }
};
export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { username, email, phone, password } = req.body;
    //checking if all fields are there.
    if (!username || !password || (!email && !phone))
      return res.status(400).send({
        code: "INVALID_REQUEST",
        message: "Please fill the form correctly",
      });
    //Calling the function LoginUser. For more info visit fauna dashboard..
    //The object literals frame the object in a way that the email will be null if user signups with phone or vice-versa
    const response = await FaunaDB.query(
      Call(Fn("LoginUser"), [
        username ? username : phone ? phone : email ? email : "",
        username ? "username" : phone ? "phone" : email ? "email" : "",
        password,
      ])
    );

    return res.status(200).send(response);
  } catch (e) {
    //This is the error handling method in all catch blocks e is typecasted because of typescript strict mode. To remove this, turn strict to false in tsconfig.json
    let Error = new FaunaError(e as errors.FaunaHTTPError);
    return res.status(Error.statusCode).send(Error);
  }
};
