import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const rawPassword = process.env.ADMIN_PASSWORD;

  if (!rawPassword) {
    console.error('❌ ADMIN_PASSWORD is not set in .env');
    process.exit(1);
  }

  const hashedPassword = await hash(rawPassword, 12);

  const admin = await prisma.admin.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hashedPassword,
    },
  });

  console.log(`✅ Admin user "${username}" is ready.`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
