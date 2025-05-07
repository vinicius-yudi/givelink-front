import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Institutions.css';


const InstitutionPage = () => {
  return (
    <div className="institution-page">
      <Navbar />

      <main className="institution-main">
        {/* Conteúdo Principal */}
        <section className="institution-content">
          {/* Barra de Pesquisa e Botão */}
          <div className="search-register-bar">
            <input
              type="text"
              placeholder="Buscar instituições..."
              className="search-input"
            />
            <button className="register-button">Cadastrar Instituição</button>
          </div>

          {/* Cards das Instituições */}
          <div className="institution-cards">
            {/* Repita esse bloco para cada instituição */}
            <div className="institution-card">
              <div className="card-image" />
              <div className="card-info">
                <h3>Hospital Esperança</h3>
                <p>Atende crianças em situação de vulnerabilidade.</p>
              </div>
            </div>


            <div className="institution-card">
              <div className="card-image" />
              <div className="card-info">
                <h3>Teste</h3>
                <p>Atende crianças em situação de vulnerabilidade.</p>
              </div>
            </div>

            <div className="institution-card">
              <div className="card-image" />
              <div className="card-info">
                <h3>Testando</h3>
                <p>Atende crianças em situação de vulnerabilidade.</p>
              </div>
            </div>

            <div className="institution-card">
              <div className="card-image" />
              <div className="card-info">
                <h3>Ola mundo</h3>
                <p>Atende crianças em situação de vulnerabilidade.</p>
              </div>
            </div>

            <div className="institution-card">
              <div className="card-image" />
              <div className="card-info">
                <h3>Ola mundo</h3>
                <p>Atende crianças em situação de vulnerabilidade.</p>
              </div>
            </div>

            <div className="institution-card">
              <div className="card-image" />
              <div className="card-info">
                <h3>Ola mundo</h3>
                <p>Atende crianças em situação de vulnerabilidade.</p>
              </div>
            </div>

            <div className="institution-card">
              <div className="card-image" />
              <div className="card-info">
                <h3>Ola mundo</h3>
                <p>Atende crianças em situação de vulnerabilidade.</p>
              </div>
            </div>

            <div className="institution-card">
              <div className="card-image" />
              <div className="card-info">
                <h3>Ola mundo</h3>
                <p>Atende crianças em situação de vulnerabilidade.</p>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default InstitutionPage;
