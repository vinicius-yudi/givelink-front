import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logoGivelink.png";
import '../components/Navbar.css';
import { notExpiredTokenJwt } from '../utils/security';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");

    if(savedToken && notExpiredTokenJwt(savedToken)){
      setIsAuthenticated(true);
    }
    else{
      setIsAuthenticated(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    setIsAuthenticated(false);
    navigate("/");
  }

  return (
    <header className="navbar-container">
    <>
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
    </>
      <div className="navbar-main">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} alt="GiveLink" />
            </Link>
          </div>

          <nav className="navbar-links">
            <Link to="/campanhas">Campanhas</Link>
            <Link to="../Institutions">Instituições</Link>
            <Link to="/contato">Contato</Link>
          </nav>

          <div className="navbar-buttons">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="login-button">Entrar</Link>
                <Link to="/register" className="register-button">Cadastre-se</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="logout-button">Logout</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
