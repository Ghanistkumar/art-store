"use client";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {ClipboardDocumentListIcon, TrashIcon} from "@heroicons/react/24/outline"
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

  const totalPayment = cart.items.reduce(
    (total: number, item: any) => total + item.price,
    0
  );

  const CartItem = ({ item }: any) => (
    <div className="flex flex-row gap-4 justify-between items-center">
      <div className="flex">
      <Image
        src={item.img}
        height={100}
        width={100}
        alt={item.title}
        className="object-cover"
      />
      <div className="text-sm">{item.title}</div>
      </div>
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

          <Typography
            variant="h6"
            component="h2"
          >
            Your cart
          </Typography>
          <hr className="mb-2"/>
          <div className="flex flex-row justify-between items-center mt-5 mb-2 font-sans">
            <div className="flex font-semibold">
              <ClipboardDocumentListIcon className="h-5 w-5" /> Cart details
            </div>
            <div>
              Total Items: <span className="font-semibold">{cart?.items?.length}</span> | To Pay: <span className="font-semibold">&#8377;{totalPayment}</span>
            </div>
          </div>
          {/*
        <div className="flex flex-row justify-between items-center mt-5 mb-2 ">
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
          */}

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
