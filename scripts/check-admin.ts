import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const prisma = new PrismaClient();

const main = async () => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username: 'admin' },
    });

    if (admin) {
      console.log('Admin user exists:', admin);
    } else {
      console.log('Admin user does not exist');
    }
  } catch (error) {
    console.error('Error checking admin:', error);
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 