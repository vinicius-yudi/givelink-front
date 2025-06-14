import React, { useState } from 'react';
import '../styles/InstitutionRegister.css';
import Navbar from '../components/Navbar';
import { validateTokenJwtRedirect } from '../utils/security';
import { useNavigate } from 'react-router-dom';

const InstitutionRegister = () => {
  const navigate = useNavigate();
  validateTokenJwtRedirect(navigate, "/InstitutionRegister", "/Login");

  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    cnpj: '',
    avatar_url: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        'http://localhost:8000/institution',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            name: formData.name,
            sector: formData.sector,
            cnpj: formData.cnpj,
            avatar_url: formData.avatar_url,
            description: formData.description
          })
        }
      );

      if(!response.ok){
          throw new Error("Error on creating a new institution.");
      }

      navigate("/Institutions");
    }
    catch(error: any){
      console.log("Error on creating institution.");
    }
  };

  return (
    <>
        <Navbar />
        <div className="institution-register-page">
        <div className="form-container">
            <h1>CADASTRO DE INSTITUIÇÃO</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nome da Instituição</label>
                <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite o nome da instituição"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="sector">Setor</label>
                <select
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                required
                >
                <option value="">Selecione o setor</option>
                <option value="Educação">Educação</option>
                <option value="Saúde">Saúde</option>
                <option value="Meio Ambiente">Meio Ambiente</option>
                <option value="Comunidade">Comunidade</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="cnpj">CNPJ</label>
                <input
                type="text"
                id="cnpj"
                name="cnpj"
                placeholder="Digite o CNPJ (somente números)"
                value={formData.cnpj}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="avatar_url">URL da imagem</label>
                <input
                type="text"
                id="avatar_url"
                name="avatar_url"
                placeholder="Insira a URL da imagem"
                value={formData.avatar_url}
                onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <input
                type="text"
                id="description"
                name="description"
                placeholder="Descrição detalhada"
                value={formData.description}
                onChange={handleChange}
                required
                />
            </div>
            <button type="submit" className="submit-button">CADASTRAR</button>
            </form>
        </div>
        </div>
    </>
  );
};

export default InstitutionRegister;