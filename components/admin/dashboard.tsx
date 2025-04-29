'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/admin/overview';
import {
  Package,
  ShoppingBag,
  Users,
  CreditCard,
  AreaChart,
  PieChart,
  BarChart,
} from 'lucide-react';

// Example data for the charts
const chartData = [
  {
    name: 'Jan',
    Notebooks: 12,
    Statues: 18,
    Candles: 5,
  },
  {
    name: 'Feb',
    Notebooks: 15,
    Statues: 20,
    Candles: 8,
  },
  {
    name: 'Mar',
    Notebooks: 10,
    Statues: 15,
    Candles: 12,
  },
  {
    name: 'Apr',
    Notebooks: 18,
    Statues: 22,
    Candles: 10,
  },
  {
    name: 'May',
    Notebooks: 20,
    Statues: 25,
    Candles: 15,
  },
  {
    name: 'Jun',
    Notebooks: 25,
    Statues: 30,
    Candles: 18,
  },
];

const categoryData = [
  { name: 'Notebooks', value: 20 },
  { name: 'Keyrings', value: 15 },
  { name: 'Statues', value: 30 },
  { name: 'Candles', value: 25 },
  { name: 'Other', value: 10 },
];

interface AdminDashboardProps {
  products: any[];
  categories: any[];
}

export function AdminDashboard({ products, categories }: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Overview</h2>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Products
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {products.length}
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Categories
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {categories.length}
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Out of Stock Products
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {products.filter((p) => p.stock === 0).length}
            </dd>
          </div>
        </dl>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.slice(0, 5).map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 