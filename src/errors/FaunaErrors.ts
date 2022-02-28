import { errors } from "faunadb";

export class FaunaError extends Error {
  code: string;
  statusCode: number;
  message: string;
  constructor(error: errors.FaunaHTTPError) {
    super();
    const errors = error.requestResult?.responseContent.errors;
    this.code = errors[0].code;
    this.message = errors[0].description;
    this.statusCode = 500;
    //Hey Future me,
    //The first if condition catches all the errors which has a cause and manipulates it to use the cause as error.
    //this thing is used because the errors thrown by functions in fauna defined by you are stored in the errors[0].cause
    //cause has a red mark because of typescript strict mode To remove this turn "strict":false in tsconfig.json
    if (errors[0].cause?.[0].code) {
      this.code = "Bad Request";
      this.statusCode = error.requestResult.statusCode;
      this.message = errors[0].cause[0].description;
    }
    //All these are boilerplate error checkers you copied from fauna documentation
    if (this.code === "instance not unique") {
      this.statusCode = 409;
    }

    if (this.code === "authentication failed") {
      this.statusCode = 401;
      this.message = "Invalid Username Or Password";
    }

    if (this.code === "unauthorized") {
      this.statusCode = 401;
    }

    if (this.code === "instance not found") {
      this.statusCode = 404;
    }

    if (this.code === "permission denied") {
      this.statusCode = 403;
    }
  }
}
