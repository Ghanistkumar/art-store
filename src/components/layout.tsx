import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export function Layout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Layout;
