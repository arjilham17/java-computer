import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

function parseDatabaseUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: Number(parsed.port) || 3306,
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.slice(1),
    connectionLimit: 10,
  };
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL is not set");

const adapter = new PrismaMariaDb(parseDatabaseUrl(dbUrl));
const prisma = new PrismaClient({ adapter });

async function main() {
  const categories = [
    { name: "Laptop", slug: "laptop" },
    { name: "PC Desktop", slug: "pc-desktop" },
    { name: "Sparepart Komputer", slug: "sparepart" },
    { name: "Monitor", slug: "monitor" },
    { name: "Printer & Scanner", slug: "printer" },
    { name: "Networking", slug: "networking" },
    { name: "Aksesoris Komputer", slug: "aksesoris" },
    { name: "Software", slug: "software" },
  ];

  console.log("Seeding categories...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
