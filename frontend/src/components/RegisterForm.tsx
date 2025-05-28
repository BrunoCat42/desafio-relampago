import { Link } from "react-router-dom";
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
      <h1>Cadastro</h1>

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

      <Button type="submit">Cadastrar</Button>

      {errorMsg && <p style={{ color: "red", marginTop: "1rem" }}>{errorMsg}</p>}

      <p style={{ marginTop: "1rem" }}>
        Já tem conta? <Link to="/login">Faça login</Link>
      </p>
    </form>
  );
}
