import { Router } from "express";
import { saveCollege, getSavedColleges } from "../controllers/saved.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = Router();
router.post("/", authenticateUser, saveCollege);
router.get("/", authenticateUser, getSavedColleges);

export default router;