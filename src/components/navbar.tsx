"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Typography, Button, Collapse, IconButton } from "@mui/material";
import {
  RectangleStackIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const NAV_MENU = [
  {
    name: "Page",
    icon: RectangleStackIcon,
    href: "/dashboard",
  },
  {
    name: "Account",
    icon: UserCircleIcon,
    href: "/account",
  },
  {
    name: "Cart",
    icon: ShoppingCartIcon,
    href: "/cart",
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-10 sticky top-4 z-50">
      <div className="mx-auto container">
        <nav className="w-full max-w-screen-2xl rounded-xl px-8 shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border-white/80 bg-white z-50 mt-6 relative border-0 pr-3 py-3 pl-6">
          <div className="flex items-center justify-between">
            <Typography
              color="textPrimary"
              className="text-lg font-bold text-black"
            >
              Logo
            </Typography>

            <div className="hidden lg:flex items-center gap-8 text-black">
              {NAV_MENU.map(({ name, icon: Icon, href }) => (
                <Link key={name} href={href} passHref>
                  <Typography
                    component="a"
                    variant="body1"
                    color="textPrimary"
                    className="flex items-center gap-2 cursor-pointer text-black"
                  >
                    <Icon className="h-5 w-5 text-black" />
                    {name}
                  </Typography>
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="text" style={{ color: "black" }}>
                Log in
              </Button>
            </div>

            <div className="lg:hidden">
              <IconButton onClick={() => setOpen(!open)}>
                {open ? (
                  <XMarkIcon strokeWidth={2} className="h-6 w-6" />
                ) : (
                  <Bars3Icon strokeWidth={2} className="h-6 w-6" />
                )}
              </IconButton>
            </div>
          </div>
          <Collapse in={open} className="lg:hidden w-full">
            <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
              <div className="flex flex-col gap-4">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <Link key={name} href={href} passHref>
                    <Typography
                      component="a"
                      variant="body1"
                      color="textPrimary"
                      className="flex items-center gap-2 cursor-pointer text-black"
                    >
                      <Icon className="h-5 w-5 text-black" />
                      {name}
                    </Typography>
                  </Link>
                ))}
              </div>
              <div className="mt-6 mb-4 flex items-center gap-4">
                <Button variant="text" style={{ color: "black" }}>
                  Log in
                </Button>
              </div>
            </div>
          </Collapse>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
