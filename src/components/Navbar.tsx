import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logoSemFundo.png";
import '../components/Navbar.css';
import { notExpiredTokenJwt } from '../utils/security';
import { Sun, Moon } from 'lucide-react'; // Importar ícones de sol e lua

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Inicializa o estado do dark mode com base no localStorage ou preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    setIsAuthenticated(!!(savedToken && notExpiredTokenJwt(savedToken)));

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    // Aplica ou remove a classe 'dark-mode' no body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    setIsAuthenticated(false);
    navigate("/");
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-main">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} alt="GiveLink" />
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="navbar-links desktop-only">
            <Link to="../donors-list">Painel do Doador</Link>
            <Link to="../Institutions">Instituições</Link>
            <Link to="../admin-select">Gerencial</Link>
          </nav>

          <div className="navbar-buttons desktop-only">
            {/* Botão de alternância de tema */}
            <button className="theme-toggle-button" onClick={toggleTheme} aria-label="Alternar tema">
              {isDarkMode ? <Sun /> : <Moon />}
            </button>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="login-button">Entrar</Link>
                <Link to="/register" className="register-button">Cadastre-se</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="logout-button">Logout</button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar-menu-btn mobile-only"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="navbar-menu-icon">&#9776;</span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="navbar-mobile-dropdown mobile-only" ref={menuRef}>
          <nav className="navbar-mobile-links">
            <Link to="../donors-list" onClick={() => setMenuOpen(false)}>Painel do Doador</Link>
            <Link to="../Institutions" onClick={() => setMenuOpen(false)}>Instituições</Link>
            <Link to="../admin-select" onClick={() => setMenuOpen(false)}>Gerencial</Link>
          </nav>
          <div className="navbar-mobile-buttons">
            {/* Botão de alternância de tema no mobile */}
            <button className="theme-toggle-button" onClick={() => { setMenuOpen(false); toggleTheme(); }} aria-label="Alternar tema">
              {isDarkMode ? <Sun /> : <Moon />}
            </button>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="login-button" onClick={() => setMenuOpen(false)}>Entrar</Link>
                <Link to="/register" className="register-button" onClick={() => setMenuOpen(false)}>Cadastre-se</Link>
              </>
            ) : (
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="logout-button">Logout</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;