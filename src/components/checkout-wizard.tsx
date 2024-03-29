"use client";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const productData = {
  name: "Example Product Name",
  image: "/image/blogs/blog4.svg",
  quantity: 1,
  price: "$19.99",
};

type WizardProps = {
  open: boolean;
  close: () => void;
};

export default function CheckoutWizard({ open, close }: WizardProps) {
  return (
    <>
      {/* Checkout Wizard Panel */}
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
          width: 384, // 96 * 4
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={close}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>

        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Checkout
        </Typography>

        {/* Product details */}
        <Image
          src={productData.image}
          height={300}
          width={350}
          className="object-cover"
          alt={productData.name}
        />
        <List>
          <ListItem>
            <ListItemText primary="Product Name" secondary={productData.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Price" secondary={productData.price} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Quantity" secondary={productData.quantity} />
          </ListItem>
          {/* Add more product details here as needed */}
        </List>
      </Box>

      {/* Overlay to darken the rest of the page when the checkout is open */}
      {open && (
        <Box
          onClick={close}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
        ></Box>
      )}
    </>
  );
}
