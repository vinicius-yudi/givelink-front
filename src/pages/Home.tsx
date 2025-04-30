import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />

      <main className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
        <div className="hero-content">
            <h1>Transforme Vidas com Sua Generosidade</h1>
            <p>Juntos podemos fazer a diferença. Cada doação é um passo em direção a um mundo mais justo e solidário.</p>
            <div className="hero-buttons">
            <a href="/campanhas" className="btn-primary">Doe Agora</a>
            <a href="/sobre" className="btn-secondary">Saiba Mais</a>
            </div>
        </div>
        </section>

        {/* Impacto */}
        <section className="impact-section">
        <div className="impact-grid">
            <div className="impact-item">
            <h3>12.500+</h3>
            <p>Pessoas Ajudadas</p>
            </div>
            <div className="impact-item">
            <h3>R$ 1.2M</h3>
            <p>Doações Arrecadadas</p>
            </div>
            <div className="impact-item">
            <h3>85+</h3>
            <p>Projetos Realizados</p>
            </div>
        </div>
        </section>

        {/* Campanhas em Destaque */}
        <section className="featured-campaigns">
        <div className="section-header">
            <h2>Campanhas em Destaque</h2>
            <p>Conheça algumas campanhas que estão mudando vidas.</p>
        </div>
        <div className="campaigns-grid">
            {/* Card 1 */}
            <div className="campaign-card">
                <div className="campaign-banner banner-educacao"></div>
                <div className="campaign-content">
                <h3>Educação para Todos</h3>
                <p>Ajude a construir uma biblioteca comunitária para crianças.</p>
                <div className="progress-bar-container">
                    <div className="progress-text">
                    <span>R$ 45.000</span>
                    <span>R$ 60.000</span>
                    </div>
                    <div className="progress-bar">
                    <div className="progress-value" style={{ width: '75%' }}></div>
                    </div>
                </div>
                <a href="/campanhas" className="btn-primary">Doar Agora</a>
                </div>
            </div>

            {/* Card 2 */}
            <div className="campaign-card">
                <div className="campaign-banner banner-saude"></div>
                <div className="campaign-content">
                <h3>Saúde para Comunidades</h3>
                <p>Ajude a equipar postos médicos em áreas rurais.</p>
                <div className="progress-bar-container">
                    <div className="progress-text">
                    <span>R$ 28.500</span>
                    <span>R$ 50.000</span>
                    </div>
                    <div className="progress-bar">
                    <div className="progress-value" style={{ width: '57%' }}></div>
                    </div>
                </div>
                <a href="/campanhas" className="btn-primary">Doar Agora</a>
                </div>
            </div>

            {/* Card 3 */}
            <div className="campaign-card">
                <div className="campaign-banner banner-alimento"></div>
                <div className="campaign-content">
                <h3>Alimento Solidário</h3>
                <p>Distribua cestas básicas a famílias carentes.</p>
                <div className="progress-bar-container">
                    <div className="progress-text">
                    <span>R$ 18.200</span>
                    <span>R$ 30.000</span>
                    </div>
                    <div className="progress-bar">
                    <div className="progress-value" style={{ width: '61%' }}></div>
                    </div>
                </div>
                <a href="/campanhas" className="btn-primary">Doar Agora</a>
                </div>
            </div>
        </div>


        <div className="see-all-button">
            <a href="/campanhas" className="btn-secondary">Todas as Campanhas</a>
        </div>
        </section>

        {/* Como Funciona */}
        <section className="how-it-works">
        <div className="section-header">
            <h2>Como Funciona</h2>
            <p>Fazer a diferença é simples. Veja como você pode contribuir em apenas três passos.</p>
        </div>
        <div className="steps-grid">
            <div className='image-step1'>
                <div className="step">
                <h3>1. Escolha uma Causa</h3>
                <p>Encontre uma campanha que ressoe com seus valores.</p>
                </div>
            </div>

            <div className='image-step2'>
                <div className="step">
                <h3>2. Faça sua Doação</h3>
                <p>Contribua com o valor que puder. Toda ajuda é importante.</p>
                </div>
            </div>

            <div className='image-step3'>
                <div className="step">
                <h3>3. Acompanhe o Impacto</h3>
                <p>Veja como sua doação está transformando vidas.</p>
                </div>
            </div>
        </div>
        </section>

        {/* Depoimentos */}
        <section className="testimonials">
        <div className="section-header">
            <h2>O Que Dizem Sobre Nós</h2>
            <p>Conheça histórias reais de transformação.</p>
        </div>
        <div className="testimonials-grid">
            <div className="testimonial-card">
            <h4>Maria Silva</h4>
            <p>"Minha doação realmente chegou a quem precisava. Gratidão à GiveLink!"</p>
            </div>
            <div className="testimonial-card">
            <h4>João Pereira</h4>
            <p>"O apoio que recebi mudou minha vida. Sou eternamente grato."</p>
            </div>
            <div className="testimonial-card">
            <h4>Carolina Mendes</h4>
            <p>"Fazer parte desta rede de solidariedade é inspirador!"</p>
            </div>
        </div>
        </section>

        {/* Call to Action */}
        <section className="call-to-action">
        <h2>Pronto para fazer a diferença?</h2>
        <p>Junte-se a milhares de pessoas transformando vidas.</p>
        <div className="cta-buttons">
            <a href="/campanhas" className="btn-primary">Doe Agora</a>
            <a href="/voluntario" className="btn-outline">Seja Voluntário</a>
        </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter">
        <h2>Fique por dentro</h2>
        <p>Receba atualizações sobre campanhas e histórias inspiradoras.</p>
        <form className="newsletter-form">
            <input type="email" placeholder="Seu melhor e-mail" />
            <button type="submit" className="btn-primary">Inscrever-se</button>
        </form>
        </section>

        </main>

      <Footer />
    </>
  );
};

export default Home;
