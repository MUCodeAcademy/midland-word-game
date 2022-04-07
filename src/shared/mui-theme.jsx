import { createTheme } from "@mui/material/styles";

export const generalTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      //dark blue
      main: "#2E4057",
    },
    secondary: {
      //orange
      main: "#FF934F",
    },
    info: {
      //medium blue
      main: "#2196f3",
    },
    background: {
      //pale yellow
      default: "#FAF8D4",

      paper: "rgb(87, 102, 120)",
    },
  },
});
