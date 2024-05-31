"use client";
import { Button, TextField, Grid, Link } from "@mui/material";
import { useFormStatus } from "react-dom";
import { createUser } from "@/app/lib/actions";
import { startTransition, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-hot-toast";

interface Props {
  toggleView: () => void;
  close: () => void;
}

interface SignUpState {
  message: string;
  errors: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
}

export function SignupForm({ toggleView, close }: Props) {
  const initialState: SignUpState = {
    message: "",
    errors: {},
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<SignUpState>(initialState);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Call startTransition to indicate non-urgent update
    startTransition(() => {
      createUser(state, formData)
        .then((result) => {
          if (result && result.errors) {
            setState((prevState) => ({
              ...prevState,
              message: result.message,
              errors: {
                username: result.errors.username,
                email: result.errors.email,
                password: result.errors.password,
              },
            }));
            setLoading(false);
          } else {
            setLoading(false);
            close();
            toast.success('Successfully Signed Up')
          }
        })
        .catch((error) => {
          console.error("Error during sign up:", error);
        });
    });
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSignUp}>
        <TextField
          label="User Name"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          name="username"
          required
        />
        {state?.errors?.username &&
          state.errors.username.map((error: string) => (
            <p className="mt-1 mb-1 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          name="email"
          required
        />
        {state?.errors?.email &&
          state.errors.email.map((error: string) => (
            <p className="mt-1 mb-1 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          name="password"
          required
        />
        {state?.errors?.password &&
          state.errors.password.map((error: string) => (
            <p className="mt-1 mb-1 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        {state.message && (
          <p className="mt-1 mb-1 text-sm text-red-500" key={state.message}>
          {state.message}
        </p>
        )}
        <SignUpButton />
        <Grid container justifyContent="flex-end">
          <Grid item>
          <Link href="#" onClick={toggleView} variant="body2">
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      style={{ backgroundColor: "black" }}
      disabled={pending}
    >
      SignUp <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
