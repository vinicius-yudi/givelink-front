import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // se estiver usando rotas
import logo from "../assets/logoGivelink.png";
import '../components/Navbar.css'; // importa o CSS separado

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar-container">
    <>
      {/* Barra de cima */}
      <div className="navbar-top">
        <div className="navbar-inner">
          <div className="navbar-top-links">
            <a href="#">Quem Somos</a>
            <a href="#">Painel do Doador</a>
            <div
              className="language-selector"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              ref={dropdownRef}
            >
              <span className="language-label">Idioma ▾</span>
              {dropdownOpen && (
                <div className="language-dropdown">
                  <a href="#">Português</a>
                  <a href="#">English</a>
                  <a href="#">Español</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ... restante da navbar-main ... */}
    </>
      <div className="navbar-main">
        <div className="navbar-inner">
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
            <Link to="/register" className="register-button">Cadastre-se</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
