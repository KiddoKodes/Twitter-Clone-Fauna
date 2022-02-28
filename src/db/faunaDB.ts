import faunaDb from "faunadb";
import dotenv from "dotenv"
dotenv.config()
//Initialize function has a optional parameter key. If key is given Faunadb will initialize as user else the server key will be used
const Initialize = (key?: string) => {
    const _Fauna = new faunaDb.Client({ secret: key ? key : process.env.FAUNA_SECRET as string });
    return _Fauna
}
//This variable contains all the Functions used in FaunaDB
const Query = faunaDb.query;

export { Initialize, Query }