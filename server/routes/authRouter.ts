import { Router } from "express";
import { signUp, signIn } from "../controllers/authController";
import { refreshToken } from "../jwt";

const router = Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/refreshToken", refreshToken);

export default router;
