import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// SIGNUP LOGIC
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists with this email" });
      return;
    }

    // 2. Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save the new user to PostgreSQL
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 4. Create a JWT token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// LOGIN LOGIC
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log("Login Attempt:", { email, password }); // DEBUG 1

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("Result: User not found in database"); // DEBUG 2
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match Status:", isMatch); // DEBUG 3

    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    // 3. Create a JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .json({ message: "Login successful", token, name: user.name });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
