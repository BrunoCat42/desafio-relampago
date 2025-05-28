import React from "react";

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
  errorMsg
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      <button type="submit">Entrar</button>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </form>
  );
}
