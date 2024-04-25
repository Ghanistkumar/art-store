import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import ToastProvider from "@/components/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RachnaSutra",
  description: "Hand Craft Art Work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/logos/title_logo-transparent.svg" />
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className={inter.className}>
        <ToastProvider />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
// useEffect(() => {
//   const loadScript = async () => {
//     const script = document.createElement('script');
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => {
//       setIsRazorpayLoading(false);
//     };
//     document.body.appendChild(script);
//   };

//   if (!window.Razorpay) {
//     loadScript();
//   } else {
//     setIsRazorpayLoading(false);
//   }
// }, []);