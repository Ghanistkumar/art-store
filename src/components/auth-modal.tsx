import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LoginForm from "./login-form";
import {SignupForm} from './signup-form';
import { XMarkIcon } from "@heroicons/react/24/solid";

const AuthModal = ({ open, close }: { open: boolean; close: () => void }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>
          <div className="flex flex-1 flex-row justify-between items-center">
            {isLoginView ? "Login" : "Sign Up"}
            <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={close} />
          </div>
        </DialogTitle>
        <DialogContent>
          {isLoginView ? (
            <LoginForm toggleView={toggleView} />
          ) : (
            <SignupForm toggleView={toggleView} close={close}/>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModal;
