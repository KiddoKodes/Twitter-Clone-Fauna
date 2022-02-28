import { Request, Response } from "express"
import { errors } from "faunadb";
import { Initialize, Query } from "../db/faunaDB"
import { FaunaError } from "../errors/FaunaErrors";
const { Call, Function: Fn } = Query;
export const Feed = async (req: Request, res: Response) => {
    const FaunaDB = Initialize(req.headers.faunasecret as string);  // initializing fauna as user because user can only see his own feed
    try {
        //Calling the function UserFeed. For more info visit Fauna Dashboard
        const docs = await FaunaDB.query(
            Call(Fn("UserFeed"))
        )
        return res.status(200).send(docs);
    }
    catch (e) {
        //This is the error handling method in all catch blocks e is typecasted because of typescript strict mode. To remove this, turn strict to false in tsconfig.json
        let Error = new FaunaError(e as errors.FaunaHTTPError);
        return res.status(Error.statusCode).send(Error)
    }

}