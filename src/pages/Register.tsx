// src/pages/Register.tsx
import React, { useState } from "react";
import "../styles/Register.css";
import iconEmail from "../assets/iconEmail.png";
import iconEyeOpen from "../assets/iconPasswordOpen.png";
import iconEyeClosed from "../assets/iconPasswordClose.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const togglePassword = () => setShowPassword(!showPassword);

  const handleRegister = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!email.trim()) newErrors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido.";
    if (!password.trim()) newErrors.password = "Senha é obrigatória.";
    else if (password.length < 6) newErrors.password = "Mínimo 6 caracteres.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage("Cadastro realizado com sucesso!");
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  return (

    <div className="register-page">
      <div className="register-container">
        <div className="register-box">
          {/* Bloco esquerdo */}
          <div className="register-info">
            <div className="info-icon-top" />
            <p>
              Transforme <span>generosidade</span> em impacto! <br />
              Cadastre-se e se <span>conecte-se</span> <br />
              a quem precisa de sua <span>ajuda</span>
            </p>
            <div className="info-icon-bottom" />
          </div>

          {/* Formulário */}
          <div className="register-form">
              <h1 className="register-title">CADASTRE-SE</h1>

            <div className="input-group">
              <input
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-underline"
              />
              {errors.name && <span className="input-error">{errors.name}</span>}
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-underline"
              />
              <span className="input-icon">
                <img src={iconEmail} alt="Email Icon" />
              </span>
              {errors.email && <span className="input-error">{errors.email}</span>}
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-underline"
              />
              <button type="button" className="input-icon" onClick={togglePassword}>
                <img src={showPassword ? iconEyeOpen : iconEyeClosed} alt="Toggle Password" />
              </button>
              {errors.password && <span className="input-error">{errors.password}</span>}
            </div>

            {successMessage && <div className="success-message">{successMessage}</div>}

            <button className="btn-submit" onClick={handleRegister}>CADASTRAR</button>

            <div className="divider">- OU -</div>

            <button className="btn-google">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="google-icon"
              />
              Continue com Google
            </button>

            <p className="login-link">
              Já possui conta? <a href="/login">Faça seu Login</a>
            </p>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default Register;
