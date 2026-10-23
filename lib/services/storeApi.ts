import { mockProducts } from '@/lib/mockData';

// Shape of a product in the mock data
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
  featured: boolean; // Featured flag
  color: {
    name: string;
    hex: string;
  }; // Product color with name and hex code
  variants?: Array<{
    size: string;
    color: {
      name: string;
      hex: string;
    };
    stock: number;
  }>; // Product variants
}

// Mock stand-ins for the old RTK Query hooks: same return shape, no backend
const result = <T,>(data: T) => ({ data, isLoading: false, error: undefined });

export const useGetProductsQuery = () => result<Product[]>(mockProducts);
export const useGetFeaturedProductsQuery = () =>
  result<Product[]>(mockProducts.filter((p) => p.featured));
export const useGetProductByIdQuery = (id: string) =>
  result<Product | undefined>(mockProducts.find((p) => p._id === id));
