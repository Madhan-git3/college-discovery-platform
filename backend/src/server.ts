import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import collegeRoutes from "./routes/college.routes";
import authRoutes from "./routes/auth.routes";
import savedRoutes from "./routes/saved.routes"; // <-- Added this import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/colleges", collegeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/saved", savedRoutes); // Now the server knows what 'savedRoutes' is

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "College Discovery API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});