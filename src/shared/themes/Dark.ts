import { createTheme } from "@mui/material";
import { cyan } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      dark: "#0E0C12",
      light: "#ffffff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00E074",
      dark: "#00E074",
      light: cyan[300],
      contrastText: "#1C212C",
    },
    background: {
      default: "#1F1E25",
      paper: "#303030",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});
