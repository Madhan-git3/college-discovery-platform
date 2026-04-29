import { Request, Response } from "express";
import { prisma } from "../db";

// 1. Fetch ALL colleges (Used for the listing and compare pages)
export const getColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const colleges = await prisma.college.findMany();
    res.json(colleges);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({ error: "Failed to fetch colleges" });
  }
};

// 2. Fetch a SINGLE college by ID (Used for the detail page)
export const getCollegeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    // Type guard to ensure ID is a string
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: "Invalid college ID" });
      return;
    }

    const college = await prisma.college.findUnique({
      where: { id: id },
    });

    if (!college) {
      res.status(404).json({ error: "College not found" });
      return;
    }

    res.json(college);
  } catch (error) {
    console.error("Error fetching single college:", error);
    res.status(500).json({ error: "Failed to fetch college details" });
  }
};