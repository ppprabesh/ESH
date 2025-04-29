import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const prisma = new PrismaClient();

const main = async () => {
  const hashedPassword = await hash('admin123', 12);

  const admin = await prisma.admin.update({
    where: { username: 'admin' },
    data: {
      password: hashedPassword,
    },
  });

  console.log('Admin password reset:', admin);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 