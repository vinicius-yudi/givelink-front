import React, { useState } from 'react';
import '../styles/Donors.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { validateTokenJwtRedirect } from '../utils/security';

const DonorsRegister = () => {
  const navigate = useNavigate();
  validateTokenJwtRedirect(navigate, "/Donors", "/Login");

  const [formData, setFormData] = useState({
    name: '',
    cpf_cnpj: '',
    avatar_url: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try{
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        'http://localhost:8000/donor',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            name: formData.name,
            cpf_cnpj: formData.cpf_cnpj,
            avatar_url: formData.avatar_url
          })
        }
      );

      if(!response.ok){
        throw new Error("Error on creating a new donor.");
      }

      navigate('/donors-list');
    }
    catch(error: any){
      console.log("Error on creating a new donor.");
    }

    alert(`Cadastro realizado com sucesso!\nNome: ${formData.name}\nCPF/CNPJ: ${formData.cpf_cnpj}`);
  };

  return (
    <>
      <Navbar />
      <div className="donors-register-page">
        <div className="form-container">
          <h1>CADASTRO DE DOADOR</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite o nome do doador"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cpfCnpj">CPF ou CNPJ</label>
              <input
                type="text"
                id="cpfCnpj"
                name="cpf_cnpj"
                placeholder="Digite seu CPF ou CNPJ"
                value={formData.cpf_cnpj}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="avatar_url">URL do Avatar</label>
              <input
                type="text"
                id="avatar_url"
                name="avatar_url"
                placeholder="Insira a URL da sua imagem"
                value={formData.avatar_url}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DonorsRegister;