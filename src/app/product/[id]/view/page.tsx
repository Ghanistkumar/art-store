"use client";
import Image from "next/image";
const { PRODUCTS } = require("../../../lib/placeholder-data.js");
import { notFound } from "next/navigation";
import { MouseEventHandler, Suspense } from "react";
import { ViewProductSkeleton } from "@/app/ui/skeletons";
import { useState } from "react";
import CheckoutWizard from "@/components/checkout-wizard";
import useCart from "@/app/utils/cart-store";

export default function Page({ params }: { params: { id: string } }) {
  const productId = params.id;
  const [open, setOpen] = useState<boolean>(false);
  const cart = useCart();
  const product = PRODUCTS.find(
    (p: { id: number | undefined }) => p.id === parseInt(productId)
  );

  if (!product) {
    notFound();
  }

  const handleAddtoCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    
    e.preventDefault();
    cart.addItem(product)
    setOpen(true);
    console.log(cart.items.length)
  };
  return (
    <>
      <Suspense fallback={<ViewProductSkeleton />}>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="max-w-4xl w-full p-4 md:p-8 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                <div className="relative h-96 md:h-full">
                  <Image
                    fill
                    className="object-cover"
                    src={product.img}
                    alt={product.title}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-8">
                <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                  {product.title}
                </h1>
                <p className="text-gray-600 mb-6">{product.desc}</p>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-semibold mr-2">Price:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {product.label}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-semibold mr-2">Quantity:</span>
                  <input
                    type="number"
                    // onWheel={(event) => (event.target as HTMLInputElement).blur()}
                    min="1"
                    className="w-16 px-2 py-1 border border-gray-300 rounded"
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
                  onClick={handleAddtoCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
      {open && <CheckoutWizard open={open} close={() => setOpen(!open)} />}
    </>
  );
}
