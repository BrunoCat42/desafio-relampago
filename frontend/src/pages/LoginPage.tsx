import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate()
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
      navigate("/dashboard")
    } catch (error) {
      setErrorMsg("Falha no login");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <LoginForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        errorMsg={errorMsg}
      />

      <p>
        Não tem cadastro?{" "}
        <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default LoginPage;
