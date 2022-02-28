import { Router } from "express";
import { Feed } from "../controllers/feed";
import { isLoggedIn } from "../middlewares/isLoggedIn";
const router = Router();

router.get("/", isLoggedIn, Feed);

export default router;
