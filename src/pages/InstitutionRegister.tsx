import React, { useState } from 'react';
import '../styles/InstitutionRegister.css';
import Navbar from '../components/Navbar';

const InstitutionRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    cnpj: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
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
            <button type="submit" className="submit-button">CADASTRAR</button>
            </form>
        </div>
        </div>
    </>
  );
};

export default InstitutionRegister;