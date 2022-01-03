import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(250,222,225,0.91)",
      light: "#fcf3f3",
      dark: "#cb9ca1",
    },
    secondary: {
      main: "#4527a0",
      light: "#7953d2",
      dark: "#000070",
    },
    error: {
      main: "#ef6e6e",
    },
    success: {
      main: "#3ebeab",
    },
  },
  components: {
    SpeedDial: {
      styleOverrides: {
        fab: {
          backgroundColor: "#004c40",
        },
      },
    },
  },

});