import { Router } from "express";
import { postLogin, postSignup } from "../controller/auth.controller.js";

const router = Router();

router.post("/login", postLogin);
router.post("/signup", postSignup);

export default router;
