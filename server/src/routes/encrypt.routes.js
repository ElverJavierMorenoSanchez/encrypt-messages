import { Router } from "express";
import {
  encryptFile,
  dencryptFile,
  getFile,
} from "../controller/encrypt.controller.js";

const router = Router();

router.post("/encrypt", encryptFile);
router.get("/decrypt/:filename/:secret", dencryptFile);
router.get("/:filename", getFile);

export default router;
