import { Link } from "react-router-dom";
import { Container, Typography, Button, Stack } from "@mui/material";

function LandingPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Sistema de Manutenção
      </Typography>

      <Stack spacing={2} mt={4}>
        <Button variant="contained" component={Link} to="/login">
          Fazer Login
        </Button>
        <Button variant="outlined" component={Link} to="/register">
          Cadastrar-se
        </Button>
      </Stack>
    </Container>
  );
}

export default LandingPage;
