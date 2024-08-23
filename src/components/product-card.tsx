"use client";
import Image from "next/image";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
interface ProductCardProps {
  product: {
    product_id: number;
    img: string;
    tag: string;
    product_name: string;
    description: string;
    price: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  return (
    <div className="max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg bg-white">
      <div className="relative h-48 md:h-64">
        <Image
          fill
          src={product.img}
          alt={product.product_name}
          className="h-full w-full object-cover scale-[1.1]"
        />
      </div>
      <div className="p-4">
        <div className="font-bold text-lg md:text-xl mb-2">{product.product_name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="px-4 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {product.tag}
        </span>
        <div className="mt-4">
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
            onClick={() => router.push(`/product/${product.product_id}/view`)}
          >
            Just @ &#8377;{product.price}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
