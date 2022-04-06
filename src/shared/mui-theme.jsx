import { createTheme } from "@mui/material/styles";

export const generalTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2E4057",
    },
    secondary: {
      main: "#FF934F",
    },
    info: {
      main: "#2196f3",
    },
    background: {
      default: "#FAF8D4",
      paper: "rgb(87, 102, 120)",
    },
  },
});
