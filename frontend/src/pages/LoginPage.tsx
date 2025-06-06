import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { Container, Box, Alert } from "@mui/material";
import { Typography } from "@mui/material";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Preencha todos os campos.");
      return;
    }

    try {
      await login(email, password);
      setErrorMsg("");
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg("Falha no login");
      console.log(error);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Box mt={2}>
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
          errorMsg={errorMsg}
        />
      </Box>
    </Container>
  );
}

export default LoginPage;
