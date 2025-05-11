// src/pages/Login.tsx
import "../styles/Login.css";
import logo from "../assets/logoGivelink.png";
import icon1 from "../assets/iconEmail.png";
import image1 from "../assets/image1.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateTokenJwtRedirect } from "../utils/security";

const Login = () => {
    const navigate = useNavigate();
    validateTokenJwtRedirect(navigate, "/", "/Login");

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [successMessage] = useState("");

    const handleLogin = async () => {
        const newErrors: typeof errors = {};
      
        if (!username.trim()) {
          newErrors.username = "O username é obrigatório.";
        } 
        else if (!/^[A-Za-z]{4,}/.test(username)) {
          newErrors.username = "Formato de usuário inválido.";
        }
      
        if (!password.trim()) {
          newErrors.password = "A senha é obrigatória.";
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
          newErrors.password = "A senha deve ter no mínimo 8 caractes sendo 1 especial, 1 número e 1 maiúsculo.";
        }
      
        setErrors(newErrors);
      
        if (Object.keys(newErrors).length === 0) {
          
          try{
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("grant_type", "password");

            const response = await fetch(
              'http://localhost:8000/auth/token',
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString()
              }
            );

            if(!response.ok){
              throw new Error("Invalid login data.");
            }

            const data = await response.json();

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("token_type", data.token_type); 
            navigate("/");      
          }
          catch(error: any){
            setErrors({
              username: "Invalid login data.",
              password: "Invalid login data."
            })
          }
        }
      };
      
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-form">
          <img src={logo} alt="GIVELINK Logo" className="logo-img" />

              <div className="input-group">
                  <input 
                  type="text" 
                  placeholder="Usuário" 
                  className="input-underline" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && <span className="input-error">{errors.username}</span>}
                  <span className="input-icon">
                      <img src={icon1} alt="Usuário" />
                  </span>
                  </div>

                  <div className="input-group">
                  <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                      className="input-underline"
                      value={password}onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <span className="input-error">{errors.password}</span>}
                  <button
                      type="button"
                      className="input-icon"
                      onClick={togglePassword}
                      aria-label="Mostrar ou ocultar senha"
                  >
                      <img
                      src={`/src/assets/${showPassword ? "iconPasswordOpen.png" : "iconPasswordClose.png"}`}
                      alt="Toggle Password"
                      />
                  </button>
              </div>
              
              {successMessage && (
                  <div className="success-message">{successMessage}</div>
              )}

              <button className="btn-login" onClick={handleLogin}>ENTRAR</button>

            <div className="divider">- OU -</div>

            <button className="btn-google">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="google-icon"
              />
              Continue com Google
            </button>

            <p className="signup-link">
              Não tem conta? <a href="/register">Cadastre-se</a>
            </p>
          </div>

          <div className="login-info">
            <h2>Espaço do(a) Doador(a)</h2>
            <p>
              Para uma melhor <span>experiência</span>,<br />
              faça seu login ou Crie uma conta.
            </p>
            <img
              src={image1} alt="Doação" className="info-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;