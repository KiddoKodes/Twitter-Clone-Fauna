import { Initialize, Query } from "../db/faunaDB";
import { Request, Response } from "express"
import { FaunaError } from "../errors/FaunaErrors";
import { errors } from "faunadb";
const { Call, Function: Fn } = Query;
export const CreateRelationships = async (req: Request, res: Response) => {
    const FaunaDB = Initialize(req.headers.faunasecret as string)//Initializing fauna as user
    var { followee } = req.body;
    //Checking the form
    if (!followee) return res.send({ code: "BAD_REQUEST", message: "Please Provide Valid Followee " })
    try {
        await FaunaDB.query(
            //Calling a function CreateRelationship. For more info Visit fauna dashboard
            Call(Fn('CreateRelationship'), followee)
        )
        return res.status(200).send({ code: "SUCCESFULL_FOLLOW", message: `You started following ${followee}` })
    }
    catch (e) {
        //This is the error handling method in all catch blocks e is typecasted because of typescript strict mode. To remove this, turn strict to false in tsconfig.json
        let Error = new FaunaError(e as errors.FaunaHTTPError);
        return res.status(Error.statusCode).send(Error)
    }
}