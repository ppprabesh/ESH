import { Card, CardBody, CardFooter } from '@heroui/react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
  };
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      isPressable
      shadow="md"
      onPress={onClick}
      className="w-full h-[300px] flex flex-col justify-between transition-transform hover:scale-105 rounded-xl bg-[#F8F3D9]"
    >
      <CardBody className="p-0">
        <div className="w-full h-[200px] overflow-hidden rounded-t-xl">
          <img
            alt={product.name}
            src={product.images?.[0] || '/images/placeholder.jpg'}
            className="w-full h-full object-contain"
          />
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start px-4 py-2 bg-[#F8F3D9] rounded-b-xl">
        <h3 className="font-semibold text-base text-[#000080] truncate w-full">{product.name}</h3>
        <p className="text-[#000080] font-semibold text-md">Rs. {product.price}</p>
      </CardFooter>
    </Card>
  );
}