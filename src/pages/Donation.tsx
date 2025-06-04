import React, { useState } from 'react';
import '../styles/Donation.css';
import Navbar from '../components/Navbar';
import Pix from '../assets/pix.png';
import CreditCard from '../assets/cartaoDeCredito.png';
import { useNavigate } from 'react-router-dom';
import { validateTokenJwtRedirect } from '../utils/security';

interface Donor {
  id: number;
  name: string;
  avatar_url: string;
  cpf_cnpj: string;
  username: string;
}

const DonationPage = () => {
  const navigate = useNavigate();
  validateTokenJwtRedirect(navigate, "/Donation", "/Login");

  const [selectedAmount, setSelectedAmount] = useState(30);
  const [formData, setFormData] = useState({
    name: '',
    cpf_cnpj: '',
    updates: false,
    amount: 0,
    payment_method: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('pix');

  const donationOptions = [
    { value: 30, label: 'R$ 30', description: 'Doação básica' },
    { value: 50, label: 'R$ 50', description: 'Doação padrão' },
    { value: 100, label: 'R$ 100', description: 'Doação premium' }
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || selectedAmount <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try{
      const token = localStorage.getItem("access_token");

      const donors = await fetch(
        'http://localhost:8000/donor/list/me',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if(!donors.ok){
          throw new Error("Error on fetching donors.");
      }

      const data: {donors: Donor[]} = await donors.json();
      const donor = data.donors.find(
        (d) => d.cpf_cnpj === formData.cpf_cnpj
      );

      if(!donor){
        throw new Error("Donor not found.");
      }

      const response = await fetch(
        'http://localhost:8000/donation',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            amount: selectedAmount,
            payment_method: paymentMethod,
            institution_id: localStorage.getItem('institution_id'),
            donor_id: donor.id
          })
        }
      );

      if(!response.ok){
          throw new Error("Error on creating a new donation.");
      }

      alert(`Obrigado ${formData.name}! Sua doação de R$ ${selectedAmount} foi processada com sucesso.`);
      setSelectedAmount(30);
      localStorage.removeItem('institution_id');
      navigate('/Institutions');
    }
    catch(error: any){
      console.log("Error on creating a new donation.");
    }
  };

  const progressPercentage = Math.min((25000 + selectedAmount) / 50000 * 100, 100);

  return (
    <>
    <Navbar />
        <div className="donation-page">
        <div className="container">
            <div className="donation-card">
            <div className="donation-container">
                {/* Left side - Impact visualization */}
                <div className="impact-visualization">
                <div className="impact-content">
                    <h2>Seu Impacto</h2>
                    <div className="progress-section">
                    <div className="progress-header">
                        <span>Meta mensal</span>
                        <span>R$ 50.000</span>
                    </div>
                    <div className="progress-bar-container">
                        <div 
                        className="progress-bar" 
                        style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <div className="progress-text">
                        <span>R$ {(25000 + selectedAmount).toLocaleString('pt-BR')}</span> Arrecadados
                    </div>
                    </div>
                                
                </div>
                </div>
                
                {/* Right side - Donation form */}
                <div className="donation-form">
                <h1>Faça sua Doação</h1>
                <p className="subtitle">Escolha quanto e como deseja doar para apoiar nossa causa</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                    <label>Valor da doação</label>
                    <div className="donation-options">
                        {donationOptions.map((option, index) => (
                        <div 
                            key={index}
                            className={`donation-option ${selectedAmount === option.value ? 'active' : ''}`}
                            onClick={() => handleAmountSelect(option.value)}
                        >
                            <p className="option-amount">{option.label}</p>
                            <p className="option-description">{option.description}</p>
                        </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="form-section">
                      <label>Método de pagamento</label>
                      <div className="payment-methods">
                        <div 
                          className={`payment-option ${paymentMethod === 'pix' ? 'active' : ''}`}
                          onClick={() => setPaymentMethod('pix')}
                        >
                          <img src={Pix} alt="Pix" className="payment-icon" />
                          <span>Pix</span>
                        </div>
                        <div 
                          className={`payment-option ${paymentMethod === 'credit' ? 'active' : ''}`}
                          onClick={() => setPaymentMethod('credit')}
                        >
                          <img src={CreditCard} alt="Cartão de Crédito" className="payment-icon" />
                          <span>Crédito</span>
                        </div>
                        <div 
                          className={`payment-option ${paymentMethod === 'debit' ? 'active' : ''}`}
                          onClick={() => setPaymentMethod('debit')}
                        >
                          <img src={CreditCard} alt="Cartão de Débito" className="payment-icon" />
                          <span>Débito</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-section">
                    <label htmlFor="name">Nome de doador</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Digite o nome de doador"
                        required
                    />
                    </div>

                    <div className="form-section">
                      <label htmlFor="cpfCnpj">CPF ou CNPJ</label>
                      <input
                        type="text"
                        id="cpfCnpj"
                        name="cpf_cnpj"
                        value={formData.cpf_cnpj || ''}
                        onChange={handleInputChange}
                        placeholder="Digite seu CPF ou CNPJ"
                        required
                      />
                    </div>                                                          
                    
                    <button type="submit" className="donate-button">
                    Doar agora
                    </button>
                    
                    <div className="security-info">
                    <p>Suas informações estão seguras e protegidas</p>
                    <div className="security-icons">
                        <span>🔒</span>
                        <span>💳</span>
                        <span>🛡️</span>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
  );
};

export default DonationPage;