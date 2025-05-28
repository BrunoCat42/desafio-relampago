import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Manutenção</h1>
      <p>
        <Link to="/login">Fazer Login</Link>
      </p>
      <p>
        <Link to="/register">Cadastrar-se</Link>
      </p>
    </div>
  );
}

export default LandingPage;
