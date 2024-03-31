"use client";
import useCart from "../utils/cart-store";
import Image from "next/image";

export default function Page() {
  const cart = useCart();
  console.log(cart.items);
  return (
    <>
      <div> Your Cart</div>
      <div>
        {cart.items.length === 0 ? (
          <h2>No Items in cart</h2>
        ) : (
          <>
            <div className="font-bold">
              {cart.items.map((item) => (
                <div key={item.id} className="text-black">
                  <p>{item.label}</p>
                  <p>{item.desc}</p>
                  <p>{item.title}</p>
                  <p>{item.id}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
