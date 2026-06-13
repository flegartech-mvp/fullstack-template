import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const password = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password,
      role: "ADMIN",
      posts: {
        create: [
          {
            title: "Hello World",
            content: "This is the first post in the template app.",
            published: true,
          },
          {
            title: "Getting Started",
            content: "Edit this template to build your own application.",
            published: true,
          },
        ],
      },
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Demo User",
      password,
      role: "USER",
    },
  });

  console.log(`✅ Seeded: admin (${admin.email}), user (${user.email})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
