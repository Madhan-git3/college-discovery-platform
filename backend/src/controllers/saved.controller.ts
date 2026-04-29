import { Request, Response } from "express";
import { prisma } from "../db";

export const saveCollege = async (req: any, res: Response) => {
  try {
    const { collegeId } = req.body;
    const userId = req.user.userId;

    // Save the relation in the database
    const saved = await prisma.savedCollege.create({
      data: { userId, collegeId }
    });

    res.status(201).json({ message: "College saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Already saved or server error" });
  }
};

export const getSavedColleges = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const saved = await prisma.savedCollege.findMany({
      where: { userId },
      include: { college: true } // Joins the college data automatically!
    });
    res.json(saved.map(s => s.college));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved colleges" });
  }
};