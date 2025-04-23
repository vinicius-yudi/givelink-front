// src/pages/Login.tsx
import "../styles/login.css";
import logo from "../assets/logoGivelink.png";
import icon1 from "../assets/iconEmail.png";
import image1 from "../assets/image1.png";
import react, { useState } from "react";




const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [successMessage, setSuccessMessage] = useState("");


    const handleLogin = () => {
        const newErrors: typeof errors = {};
      
        if (!email.trim()) {
          newErrors.email = "O email é obrigatório.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = "Formato de email inválido.";
        }
      
        if (!password.trim()) {
          newErrors.password = "A senha é obrigatória.";
        } else if (password.length < 6) {
          newErrors.password = "A senha deve ter no mínimo 6 caracteres.";
        }
      
        setErrors(newErrors);
      
        if (Object.keys(newErrors).length === 0) {
          // Simulação de envio
          setSuccessMessage("Login enviado com sucesso!");
          setEmail("");
          setPassword("");
      
          // Limpa a mensagem após alguns segundos
          setTimeout(() => setSuccessMessage(""), 4000);
        }
      };
      

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
        <img src={logo} alt="GIVELINK Logo" className="logo-img" />

            <div className="input-group">
                <input 
                type="email" 
                placeholder="Email" 
                className="input-underline" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="input-error">{errors.email}</span>}
                <span className="input-icon">
                    <img src={icon1} alt="Email" />
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
            Não tem conta? <a href="/cadastro">Cadastre-se</a>
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
  );
};



export default Login;
