import React, { useState } from 'react';
import '../styles/Donation.css';
import Navbar from '../components/Navbar';
import Pix from '../assets/pix.png';
import CreditCard from '../assets/cartaoDeCredito.png';

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(30);
  const [formData, setFormData] = useState({
    name: '',
    cpfCnpj: '',
    updates: false
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || selectedAmount <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    alert(`Obrigado ${formData.name}! Sua doação de R$ ${selectedAmount} foi processada com sucesso.`);
    
    // Reset form
    setFormData({
      name: '',
      cpfCnpj: '',
      updates: false
    });
    setSelectedAmount(30);
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
                    <label htmlFor="name">Nome completo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                    />
                    </div>

                    <div className="form-section">
                      <label htmlFor="cpfCnpj">CPF ou CNPJ</label>
                      <input
                        type="text"
                        id="cpfCnpj"
                        name="cpfCnpj"
                        value={formData.cpfCnpj || ''}
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