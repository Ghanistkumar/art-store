"use client";
import useCart from "../utils/cart-store";
import Image from "next/image";
import axios from "axios";
import { Navbar } from "@/components";

export default function Page() {
  const cart = useCart();

  const totalPayment = cart.items.reduce(
    (total: number, item: any) => total + item.price,
    0
  );

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/checkout`,
      {
        productIds: cart.items.map((item) => item.id),
      }
    );

    window.location = response.data.url;
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto flex flex-col md:flex-row justify-between mt-5 p-4 md:p-8">
        <div className="md:w-2/3 bg-slate-100 rounded-xl p-5 m-5 shadow-lg">
          <h2 className="font-bold text-xl mb-4">Your Cart</h2>
          {cart.items.length === 0 ? (
            <p>No Items in cart</p>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-row sm:flex-row items-start gap-3 justify-between text-black mb-4 p-2 hover:bg-slate-200 rounded"
              >
                <Image
                  height={100}
                  width={100}
                  className="object-cover"
                  src={item.img}
                  alt={item.title}
                />
                <div className="md:text-left md:ml-4">
                  <p className="text-lg md:text-sm font-semibold">{item.title}</p>
                  <p>Price: &#8377;{item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="md:w-1/3 bg-slate-100 rounded-xl p-5 m-5 shadow-lg flex flex-col items-center md:items-start">
          <h2 className="font-bold text-xl mb-4">Total Payment</h2>
          <p className="text-2xl">&#8377;{totalPayment.toFixed(2)}</p>
          <button
            className="w-1/2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            onClick={onCheckout}
          >
            Pay
          </button>
        </div>
      </div>
    </>
  );
}
