// theme configuration for MUI (Material-UI) components
import { createTheme } from "@mui/material/styles";

export function getMuiTheme(mode = "light") {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode: isDark ? "dark" : "light",

      // Neutral placeholders ONLY
      primary: {
        main: isDark ? "#ffffff" : "#000000",
      },
      secondary: {
        main: isDark ? "#cccccc" : "#333333",
      },
      error: {
        main: "#d32f2f",
      },

      background: {
        default: isDark ? "#121212" : "#ffffff",
        paper: isDark ? "#1e1e1e" : "#ffffff",
      },

      text: {
        primary: isDark ? "#ffffff" : "#000000",
        secondary: isDark ? "#b0b0b0" : "#555555",
      },
    },

    typography: {
      fontFamily: "'Inter', system-ui, sans-serif",
    },

    shape: {
      borderRadius: 8,
    },

    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
    },
  });
}
