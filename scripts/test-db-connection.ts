import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const prisma = new PrismaClient();

const main = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('Database connection successful');

    // Test admin table access
    const adminCount = await prisma.admin.count();
    console.log('Admin table accessible, count:', adminCount);

    // Test a simple query
    const admin = await prisma.admin.findFirst();
    console.log('Test query successful, first admin:', admin);
  } catch (error) {
    console.error('Database connection error:', error);
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