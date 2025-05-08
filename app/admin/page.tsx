import { prisma } from '@/lib/prisma';
import { AdminDashboard } from '@/components/admin/dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true, // Including category details with each product
      },
    }),
    prisma.category.findMany(), // Fetching all categories
  ]);

  return <AdminDashboard products={products} categories={categories} />;
}
