export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // URLs to Vercel Blob Storage
  categories: string[];
  
  // Common attributes
  color?: string[];
  size?: string[];
  material?: string[];
  
  // Category-specific attributes
  attributes: {
    scent?: string;       // For scented candles
    flavor?: string;      // For essence oils
    fragrance?: string;   // For handmade soaps
    // Add other specific attributes as needed
  };
  
  featured: boolean;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
  slug: string; // URL-friendly version of name
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string; // URL to Vercel Blob Storage
  slug: string;   // URL-friendly version of name
}

export interface ProductFilters {
  category?: string;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  limit?: number;
}