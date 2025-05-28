// src/components/LoginForm.tsx
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("Tentando login com:", email, password);
    // Aqui futuramente entra a lógica real com fetch
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email"
        required
      />

      <Input
        label="Senha"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Digite sua senha"
        required
      />

      <Button type="submit">Entrar</Button>

      <p style={{ marginTop: "1rem" }}>
        Ainda não tem conta?{" "}
        <a href="/cadastro" style={{ color: "#007bff" }}>
          Cadastre-se
        </a>
      </p>
    </form>
  );
}
