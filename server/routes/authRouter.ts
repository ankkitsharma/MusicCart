import { Router } from "express";
import { signUp } from "../controllers/authController";

const router = Router();

router.post("/signUp", signUp);

export default router;
