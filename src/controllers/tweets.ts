import { Request, Response } from "express";
import { errors } from "faunadb";
import { Initialize, Query } from "../db/faunaDB"
import { FaunaError } from "../errors/FaunaErrors";
const { Call, Function: Fn, CurrentIdentity } = Query;

export const AddTweet = async (req: Request, res: Response) => {
    const FaunaDB = Initialize(req.headers.faunasecret as string)//Initializing fauna as user
    const { tweet } = req.body;
    //Checking the form..
    if (!tweet.text) return res.send({ code: "BAD_REQUEST", message: "Please provide a valid tweet" })
    //Getting the current user document <b>ref</b> for the data object
    //CurrentIdentity is a fauna function. For more info read Fauna Docs
    let user = await FaunaDB.query(CurrentIdentity()).catch(e => res.status(400).send({ code: "BAD_REQUEST", message: e }));
    const data = {
        user: user,
        tweet: {
            text: tweet.text,
            taggedPeople: tweet.people,
            hashtags: tweet.tags
        }
    }
    try {
        //Calling the function AddTweet. For more info visit fauna dashboard
        const docs = await FaunaDB.query(
            Call(Fn("AddTweet"), { data })
        )
        return res.status(200).send(docs)
    }
    catch (e) {
        //This is the error handling method in all catch blocks e is typecasted because of typescript strict mode. To remove this, turn strict to false in tsconfig.json
        let Error = new FaunaError(e as errors.FaunaHTTPError);
        return res.status(Error.statusCode).send(Error)
    }
}
//This function retrieves a single tweet
export const TweetDetails = async (req: Request, res: Response) => {
    const FaunaDB = Initialize(req.headers.faunaSecret as string) //Initializing Fauna as user
    try {
        //Calling the function GetSingleTweet. For more info visit Fauna Dashboard
        const doc = await FaunaDB.query(
            Call(Fn("GetSingleTweet"), req.params.id)
        )
        res.send(doc)
    }
    catch (e) {
        //This is the error handling method in all catch blocks e is typecasted because of typescript strict mode. To remove this, turn strict to false in tsconfig.json
        let Error = new FaunaError(e as errors.FaunaHTTPError);
        return res.status(Error.statusCode).send(Error)

    }
}
//This function retrieves all the tweets tweeted by a user
export const GetTweetsOfAUser = async (req: Request, res: Response) => {
    const { user } = req.params; // Tweets of this user will be retrieved
    const FaunaDB = Initialize(req.headers.faunaSecret as string)// Initializing Fauna as user
    //Checking the form
    if (!user) return res.send({ code: "BAD_REQUEST", message: "Please provide a username" })
    try {
        //Calling the function GetTweetsOfAUser. For more info visit fauna dashboard
        const docs = await FaunaDB.query(
            Call(Fn("GetTweetsOfAUser"), [user])
        )
        res.send(docs)
    }
    catch (e) {
        //This is the error handling method in all catch blocks e is typecasted because of typescript strict mode. To remove this, turn strict to false in tsconfig.json
        let Error = new FaunaError(e as errors.FaunaHTTPError);
        return res.status(Error.statusCode).send(Error)

    }
}
export const DeleteTweet = async (req: Request, res: Response) => {
    const FaunaDB = Initialize(req.headers.faunasecret as string)// Initializing fauna as user
    //checking the parameters ie:/api/tweets/2038457994(id)...
    if (!req.params.id) return res.send({ code: "BAD_REQUEST", message: "Please provide a id" })
    try {
        //Calling the function GetTweetsOfAUser. For more info visit fauna dashboard
        await FaunaDB.query(
            Call(Fn("DeleteTweet"), req.params.id)
        )
        res.status(200).send({ code: "SUCCESSFULLY_DELETED", message: `Successfully deleted ${req.params.id}` })
    }
    catch (e) {
        //This is the error handling method in all catch blocks e is typecasted because of typescript strict mode. To remove this, turn strict to false in tsconfig.json
        let Error = new FaunaError(e as errors.FaunaHTTPError);
        return res.status(Error.statusCode).send(Error)
    }
}