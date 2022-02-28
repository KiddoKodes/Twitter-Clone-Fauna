import { Router } from "express";
import { AddTweet, DeleteTweet, GetTweetsOfAUser, TweetDetails } from "../controllers/tweets";

const router = Router();
router.post("/", AddTweet)
router.get("/:user", GetTweetsOfAUser)
router.get("/:id", TweetDetails)
router.delete("/:id", DeleteTweet)
export default router