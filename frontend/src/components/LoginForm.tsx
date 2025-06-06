import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

import Input from "./Input";
import Button from "./Button";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMsg?: string;
}

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  errorMsg,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit}>
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
        Entrar
      </Button>

      {errorMsg && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {errorMsg}
        </Typography>
      )}

      <Typography sx={{ mt: 2 }}>
        Ainda não tem conta?{" "}
        <Link
          component={RouterLink}
          to="/register"
          underline="hover"
          sx={{ color: "primary.main", fontWeight: 500 }}
        >
          Cadastre-se
        </Link>
      </Typography>
    </form>
  );
}
