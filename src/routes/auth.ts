import { Router } from "express";
import { LoginUser, Signup } from "../controllers/auth";
import { isLoggedOut } from "../middlewares/isLoggedOut";

const router = Router();
router.post("/signup", isLoggedOut, Signup)
router.post("/login", isLoggedOut, LoginUser)
export default router;