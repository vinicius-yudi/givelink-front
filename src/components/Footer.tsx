import React, { useEffect } from 'react';
import '../components/Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaChevronUp } from 'react-icons/fa';
import logo from "../assets/logoBranca.png";


const Footer: React.FC = () => {
  useEffect(() => {
    const backToTopButton = document.getElementById('backToTop');
    const handleScroll = () => {
      if (backToTopButton) {
        if (window.scrollY > 300) {
          backToTopButton.style.opacity = '1';
          backToTopButton.style.visibility = 'visible';
        } else {
          backToTopButton.style.opacity = '0';
          backToTopButton.style.visibility = 'hidden';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Coluna 1: Sobre */}
          <div>
            <h3 className="footer-title">Sobre Nós</h3>
            <div className="footer-brand">
              <img src={logo} alt="GiveLink Logo" className="footer-logo-img" />
            </div>
            <p className="footer-text">Conectando doadores a quem precisa desde 2025 com tecnologia e transparência.</p>
            <div className="footer-socials">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Coluna 2: Links Úteis */}
          <div>
            <h3 className="footer-title">Links Úteis</h3>
            <ul className="footer-links">
              <li><Link to="/">Início</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/campanhas">Campanhas</Link></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Serviços */}
          <div>
            <h3 className="footer-title">Nossos Serviços</h3>
            <ul className="footer-links">
              <li><Link to="/desenvolvimento-web">Instituições</Link></li>
              <li><Link to="/desenvolvimento-web">Painel do Doador</Link></li>
              <li><Link to="/design-grafico">Dashboards</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h3 className="footer-title">Contato</h3>
            <ul className="footer-contact">
              <li><FaMapMarkerAlt /><span>R. Imac. Conceição, 1155<br />Curitiba, PR, 80215-901</span></li>
              <li><FaPhoneAlt /><span>(41) 98846-4532</span></li>
              <li><FaEnvelope /><span>contato@givelink.com</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© 2025 GiveLink. Todos os direitos reservados.</p>
          <div className="footer-bottom-links">
            <Link to="/termos">Termos de Uso</Link>
            <Link to="/privacidade">Política de Privacidade</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>

      {/* Botão Voltar ao Topo */}
      <button id="backToTop" className="back-to-top" onClick={scrollToTop}>
        <FaChevronUp />
      </button>
    </footer>
  );
};

export default Footer;
