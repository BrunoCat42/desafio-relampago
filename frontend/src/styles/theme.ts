import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8f5fdc" },
    secondary: { main: "#40306d" },
    background: {
      default: "#1a1536",
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
          fontSize: 16
        },
        body: {
          color: "#e8eaf6"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
  },
});

export default theme;