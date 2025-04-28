import React from 'react';
import { Link } from 'react-router-dom'; // se estiver usando rotas
import logo from "../assets/logoBranca.png";
import '../layout/Navbar.css'; // importa o CSS separado

const Navbar = () => {
  return (
    <header className="navbar-container">
      {/* Barra superior */}
      <div className="navbar-top">
        <div className="navbar-top-links">
          <a href="#">Quem Somos</a>
          <a href="#">Painel do Doador</a>
          <a href="#">Idioma</a>
        </div>
      </div>

      {/* Barra principal */}
      <div className="navbar-main">
        <div className="navbar-logo">
          <Link to="/Home">
            <img src={logo} alt="GiveLink" />
          </Link>
        </div>

        <nav className="navbar-links">
          <Link to="/campanhas">Campanhas</Link>
          <Link to="/instituicoes">Instituições</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <div className="navbar-buttons">
          <Link to="/login" className="login-button">Entrar</Link>
          <Link to="/cadastro" className="register-button">Cadastre-se</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
