import Image from "next/image";
import { Button } from "@mui/material";
import Link from 'next/link';

interface ProductCardProps {
  id: number,
  img: string;
  tag: string;
  title: string;
  desc: string;
  label: string;
}

export function ProductCard({
  id,
  img,
  tag,
  title,
  desc,
  label,
}: ProductCardProps) {
  return (
    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white">
      <div className="relative h-48 md:h-64">
        <Image
          fill
          src={img}
          alt={title}
          className="h-full w-full object-cover scale-[1.1]"
        />
      </div>
      <div className="p-4">
        <div className="font-bold text-lg md:text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{desc}</p>
      </div>
      <div className="px-4 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {tag}
        </span>
        <div className="mt-4">
          <Link href={`/products/${id}`} passHref>
          <Button variant="outlined" LinkComponent="a" style={{ color: "gray" }}>
            {label}
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
