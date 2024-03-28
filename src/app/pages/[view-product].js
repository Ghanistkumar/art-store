// pages/[productId].js
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';

export default function ViewProduct({ product }) {
  const [cart, setCart] = useState([]);

  const addToCart = () => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="relative h-64">
            <Image
              layout="fill"
              objectFit="cover"
              src={product.image}
              alt={product.title}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-10">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <div className="mt-4 font-bold text-lg">{product.price}</div>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  // Replace `fetchProductData` with your actual data-fetching logic
  const { productId } = context.params;
  const product = await fetchProductData(productId);

  // Pass product data to the page via props
  return { props: { product } };
}
