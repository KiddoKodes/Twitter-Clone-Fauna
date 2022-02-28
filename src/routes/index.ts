import express from "express";
import AuthRoutes from "./auth"
import RelationshipRoutes from "./relationships"
import FeedRoutes from "./feed"
import TweetRoutes from "./tweets"
const Router = express.Router();
Router.use("/auth", AuthRoutes)
Router.use("/tweets", TweetRoutes)
Router.use("/relationships", RelationshipRoutes)
Router.use("/feed", FeedRoutes)

export default Router