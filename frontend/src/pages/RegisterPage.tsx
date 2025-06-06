import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { Container, Typography, Box, Alert } from "@mui/material";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMsg("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) throw new Error("Erro ao registrar.");

      navigate("/login");
    } catch (error) {
      setErrorMsg("Erro ao registrar usuário.");
      console.log(error);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro
      </Typography>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Box mt={2}>
        <RegisterForm
          name={name}
          email={email}
          password={password}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
          errorMsg={errorMsg}
        />
      </Box>
    </Container>
  );
}

export default RegisterPage;
