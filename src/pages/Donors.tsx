import React, { useState } from 'react';
import '../styles/Donors.css';
import Navbar from '../components/Navbar';

const DonorsRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpfCnpj: '',
    avatar_url: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio para o backend
    alert(`Cadastro realizado com sucesso!\nNome: ${formData.name}\nCPF/CNPJ: ${formData.cpfCnpj}`);
    setFormData({
      name: '',
      cpfCnpj: '',
      avatar_url: ''
    });
  };

  return (
    <>
      <Navbar />
      <div className="donors-register-page">
        <div className="form-container">
          <h1>CADASTRO DE DOADOR</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite seu nome completo"
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
                name="cpfCnpj"
                placeholder="Digite seu CPF ou CNPJ"
                value={formData.cpfCnpj}
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