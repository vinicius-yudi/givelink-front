import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./Admin.css";
import { validateTokenJwtRedirect, validateTokenJwtRedirectWithNoUseEffects } from "../utils/security";
import { useEffect } from "react";

interface UserResponse{
    id: number;
    username: string;
    email: string,
    avatar_url: string,
    role: string
}

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    validateTokenJwtRedirectWithNoUseEffects(navigate, "/admin-select", "/Login");
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch("http://localhost:8000/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data: UserResponse = await response.json();

        if (data.role !== "admin") {
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <div className="admin-controls">
          <Link to="/dashboard" className="admin-button">Relatório</Link>
          <Link to="/resources" className="admin-button">Gerencial</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
