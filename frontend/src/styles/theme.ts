// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8f5fdc" },
    secondary: { main: "#fff" },
    background: {
      default: "#8a80cc", // cor do fundo da página
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: "#23204a",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
        },
        body: {
          color: "#e8eaf6",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#312f4f", 
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        },
      },
    },
  },
});

export default theme;
