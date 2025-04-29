import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { fileURLToPath } from 'url';

// ESM specific features
const __filename = fileURLToPath(import.meta.url);

const prisma = new PrismaClient();

const main = async () => {
  const hashedPassword = await hash('admin123', 12); // Change this password as needed

  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('Admin user created:', admin);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 