"use client"
import { useState, startTransition } from "react";
import {
  Button,
  TextField,
  Grid,
  Link,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { signIn } from "@/app/lib/actions";
import { useFormStatus } from "react-dom";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/16/solid";
import toast from "react-hot-toast";
import useUserStore from "@/app/utils/user-store";
import { redirect } from "next/navigation";
interface Props {
  toggleView: () => void;
  close: () => void;
}

interface SignInState {
  message: string;
  errors: {
    email?: string[];
    password?: string[];
  };
}

const LoginForm = ({ toggleView, close }: Props) => {
  const initialState: SignInState = {
    message: "",
    errors: {},
  };
  const useStore = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<SignInState>(initialState);
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      signIn(state, formData)
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
            console.log(result)
            useStore.setUser(result?.username, result?.user_id)
            toast.success("Successfull Logged In");
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
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          name="email"
          variant="outlined"
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
          name="password"
          variant="outlined"
          required
        />
        {state?.errors?.password &&
          state.errors.password.map((error: string) => (
            <p className="mt-1 mb-1 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        {state.message && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="mt-1 mb-1 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          </>
        )}
        <LoginButton />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" onClick={toggleView} variant="body2">
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      style={{ backgroundColor: "black" }}
      disabled={pending}
    >
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
