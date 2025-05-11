// src/pages/Register.tsx
import { useState } from "react";
import "../styles/Register.css";
import iconEmail from "../assets/iconEmail.png";
import iconEyeOpen from "../assets/iconPasswordOpen.png";
import iconEyeClosed from "../assets/iconPasswordClose.png";
import { useNavigate } from "react-router-dom";
import { validateTokenJwtRedirect } from "../utils/security";

const Register = () => {
  const navigate = useNavigate();
  validateTokenJwtRedirect(navigate, "/");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage] = useState("");
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

  const togglePassword = () => setShowPassword(!showPassword);

  const handleRegister = async () => {
    const newErrors: typeof errors = {};
    if (!username.trim()) {
      newErrors.username = "Usuário é obrigatório."
    }
    else if (!/^[A-Za-z]{4,}/.test(username)) {
      newErrors.username = "Formato de usuário inválido.";
    };
    if (!email.trim()) {
      newErrors.email = "Email é obrigatório.";
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido.";
    }
    if (!password.trim()) {
      newErrors.password = "Senha é obrigatória.";
    }
    else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
      newErrors.password = "A senha deve ter no mínimo 8 caractes sendo 1 especial, 1 número e 1 maiúsculo.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try{
        const response = await fetch(
          'http://localhost:8000/user',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password
            })
          }
        )

        if(!response.ok){
          throw new Error("Error on creating a new user.");
        }

        navigate("/login");
      }
      catch(error: any){
        setErrors({
          username: "Invalid username.",
          password: "Invalid password.",
          email: "Invalid email."
        })
      }
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
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-underline"
              />
              {errors.username && <span className="input-error">{errors.username}</span>}
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
