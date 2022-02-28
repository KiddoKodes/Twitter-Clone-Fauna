import { Router } from "express";
import { CreateRelationships } from "../controllers/relationships";
const router = Router();
router.post("/", CreateRelationships)

export default router