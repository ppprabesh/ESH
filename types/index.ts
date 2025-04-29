export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  featured?: boolean;
  inStock?: boolean;
  createdAt: Date;
  description?: string;
} 