"use client";
import Image from "next/image";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Typography, Box, Button } from "@mui/material";
import useCart from "@/app/utils/cart-store";
import { useRouter } from "next/navigation";

type WizardProps = {
  open: boolean;
  close: () => void;
};

export default function CheckoutWizard({ open, close }: WizardProps) {
  const cart = useCart();
  const router = useRouter();
  const removeItem = (id: number) => {
    cart.removeItem(id);
  };

  const emptyCart = () => {
    cart.removeAll();
  };

  const CartItem = ({ item }: any) => (
    <div className="flex flex-row gap-4 justify-between items-center">
      <Image
        src={item.img}
        height={100}
        width={100}
        alt={item.title}
        className="object-cover"
      />
      <div>
        &#8377; {item.price}
        <IconButton
          onClick={() => removeItem(item.id)}
          style={{ color: "black" }}
        >
          <TrashIcon className="h-6 w-6" />
        </IconButton>
      </div>
    </div>
  );

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 50,
          height: "100%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          width: 384,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton
          onClick={close}
          sx={{ position: "absolute", right: 8, top: 8 }}
          aria-price="Close cart summary"
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>

        <div className="flex flex-row justify-between items-center mt-5 mb-2 ">
          <Typography
            variant="h6"
            component="h2"
          >
            Cart Summary
          </Typography>
          {cart?.items?.length != 0 && (
            <Button
              onClick={emptyCart}
              style={{
                backgroundColor: "red",
                color: "white",
                height: "25px",
                borderRadius: "20px",
              }}
            >
              Empty Cart
            </Button>
          )}
        </div>

        {cart.items && cart.items.length > 0 ? (
          <div className="flex flex-col flex-grow overflow-y-auto gap-3">
            {cart.items.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
        ) : (
          <Typography sx={{ alignSelf: "center" }}>"Cart Empty :("</Typography>
        )}

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => router.push("/cart")}
        >
          Checkout
        </Button>
      </Box>
      {open && (
        <Box
          onClick={close}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
        />
      )}
    </>
  );
}
