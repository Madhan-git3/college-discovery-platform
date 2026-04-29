import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// Initialize the PostgreSQL adapter
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.college.createMany({
    data: [
      {
        name: "Indian Institute of Technology (IIT) Bombay",
        location: "Mumbai, Maharashtra",
        fees: 250000,
        rating: 4.9,
        placementPct: 98.5,
        courses: ["B.Tech in Computer Science", "M.Tech", "PhD"],
        description: "Top-tier engineering institute with world-class facilities.",
      },
      {
        name: "National Institute of Technology (NIT) Trichy",
        location: "Tiruchirappalli, Tamil Nadu",
        fees: 150000,
        rating: 4.7,
        placementPct: 95.0,
        courses: ["B.Tech", "M.Tech", "MCA"],
        description: "Premier engineering college known for excellent placements.",
      },
      {
        name: "Vellore Institute of Technology (VIT)",
        location: "Vellore, Tamil Nadu",
        fees: 300000,
        rating: 4.5,
        placementPct: 90.0,
        courses: ["B.Tech", "BCA", "M.Tech"],
        description: "Private university with diverse courses and great infrastructure.",
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });