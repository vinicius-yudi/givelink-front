import React, { useState } from 'react';
import '../styles/Donation.css';
import Navbar from '../components/Navbar';

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(30);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('once');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    updates: false
  });

  const donationOptions = [
    { value: 30, label: 'R$ 30', description: 'Doação básica' },
    { value: 50, label: 'R$ 50', description: 'Doação padrão' },
    { value: 100, label: 'R$ 100', description: 'Doação premium' }
  ];

  const impactItems = [
    { emoji: '🍽️', amount: 'R$ 30', description: 'Alimenta uma família por um dia' },
    { emoji: '📚', amount: 'R$ 50', description: 'Kit escolar para uma criança' },
    { emoji: '💊', amount: 'R$ 100', description: 'Medicamentos para idosos' }
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value));
    }
  };

  // Função que estava faltando
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || selectedAmount <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    alert(`Obrigado ${formData.name}! Sua doação de R$ ${selectedAmount} foi processada com sucesso. Um comprovante foi enviado para ${formData.email}.`);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      updates: false
    });
    setSelectedAmount(30);
    setCustomAmount('');
    setFrequency('once');
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
                        <span>R$ {(25000 + selectedAmount).toLocaleString('pt-BR')}</span> arrecadados
                    </div>
                    </div>
                    
                    <div className="impact-list">
                    <h3>O que sua doação proporciona:</h3>
                    {impactItems.map((item, index) => (
                        <div key={index} className="impact-item">
                        <div className="impact-emoji">{item.emoji}</div>
                        <div className="impact-details">
                            <p className="impact-amount">{item.amount}</p>
                            <p className="impact-description">{item.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                    
                    <div className="thank-you">
                    <div className="heart">❤️</div>
                    <p>Obrigado por fazer a diferença!</p>
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
                            className={`donation-option ${selectedAmount === option.value && !customAmount ? 'active' : ''}`}
                            onClick={() => handleAmountSelect(option.value)}
                        >
                            <p className="option-amount">{option.label}</p>
                            <p className="option-description">{option.description}</p>
                        </div>
                        ))}
                        <div 
                        className={`donation-option custom-amount ${customAmount ? 'active' : ''}`}
                        >
                        <p className="option-amount">Outro valor</p>
                        <input
                            type="number"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            placeholder="R$ 0,00"
                            min="1"
                        />
                        </div>
                    </div>
                    </div>
                    
                    <div className="form-section">
                    <label>Frequência</label>
                    <div className="frequency-options">
                        <label>
                        <input
                            type="radio"
                            name="frequency"
                            value="once"
                            checked={frequency === 'once'}
                            onChange={() => setFrequency('once')}
                        />
                        <span>Única</span>
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="frequency"
                            value="monthly"
                            checked={frequency === 'monthly'}
                            onChange={() => setFrequency('monthly')}
                        />
                        <span>Mensal</span>
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="frequency"
                            value="yearly"
                            checked={frequency === 'yearly'}
                            onChange={() => setFrequency('yearly')}
                        />
                        <span>Anual</span>
                        </label>
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
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        required
                    />
                    </div>
                    
                    <div className="form-section">
                    <label htmlFor="phone">Telefone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(00) 00000-0000"
                        required
                    />
                    </div>
                    
                    <div className="form-section checkbox-section">
                    <label>
                        <input
                        type="checkbox"
                        name="updates"
                        checked={formData.updates}
                        onChange={handleInputChange}
                        />
                        <span>Quero receber atualizações sobre o impacto da minha doação e novidades sobre os projetos</span>
                    </label>
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