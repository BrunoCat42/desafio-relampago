import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8f5fdc" },
    secondary: { main: "#40306d" },
    background: {
      default: "#1a1536",
      paper: "#23204a"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Mais contraste para outlined em fundo escuro
          '&.MuiButton-outlined': {
            borderColor: '#fff',
            color: '#fff',
            background: 'rgba(255,255,255,0.07)',
            '&:hover': {
              background: 'rgba(255,255,255,0.13)',
              borderColor: '#fff',
            }
          },
        }
      }
    }
  }
});

export default theme;