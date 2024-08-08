import { Router } from "express";
import { getUser } from "../controllers/userController";
import { verifyToken } from "../jwt";

const router = Router();

router.get("/getUser", verifyToken, getUser);

export default router;
