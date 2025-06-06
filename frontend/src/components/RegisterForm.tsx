import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

import Input from "./Input";
import Button from "./Button";

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMsg?: string;
}

export default function RegisterForm({
  name,
  email,
  password,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  errorMsg,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Nome"
        id="name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Digite seu nome"
      />

      <Input
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="Digite seu email"
      />

      <Input
        label="Senha"
        id="password"
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        placeholder="Digite sua senha"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Cadastrar
      </Button>

      {errorMsg && (
        <p style={{ color: "red", marginTop: "1rem" }}>{errorMsg}</p>
      )}

      <Typography sx={{ mt: 2 }}>
        Já tem conta?{" "}
        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          sx={{ color: "primary.main", fontWeight: 500 }}
        >
          Faça login
        </Link>
      </Typography>
    </form>
  );
}
