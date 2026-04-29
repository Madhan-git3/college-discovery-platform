import { Router } from "express";
import { getColleges, getCollegeById } from "../controllers/college.controller";

const router = Router();

router.get("/", getColleges);
router.get("/:id", getCollegeById); // The :id means this part of the URL is a variable

export default router;