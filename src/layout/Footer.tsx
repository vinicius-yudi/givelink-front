import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logoSemFundo.png";
import '../layout/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">

        {/* Logo */}
        <div className="footer-logo-section">
          <img src={logo} alt="GiveLink" className="footer-logo" />
          <p>Conectando Generosidade e Necessidade.</p>
        </div>

        {/* Colunas de Links */}
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Institucional</h4>
            <Link to="/sobre">Sobre</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/termos">Termos de Uso</Link>
          </div>

          <div className="footer-column">
            <h4>Ajuda</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/suporte">Suporte</Link>
          </div>

          <div className="footer-column">
            <h4>Social</h4>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 GiveLink. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
