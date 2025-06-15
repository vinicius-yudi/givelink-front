import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CountUp from 'react-countup';
import '../styles/Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const Home: React.FC = () => {
    useEffect(() => {
        AOS.init({ duration: 1500, once: true });
      }, []);
    
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
            <a href="/donation" className="btn-primary">Faça sua Doação</a>
            </div>
        </div>
        </section>

        {/* Impacto */}
        <section className="impact-section">
        <div className="impact-grid">
            <div className="impact-item">
            <h3><CountUp start={9000} end={53500} duration={5.5} separator="." />+</h3>
            <p>Pessoas Ajudadas</p>
            </div>
            <div className="impact-item">
            <h3>R$ <CountUp start={1000000} end={3000000} duration={5.5} prefix="" separator="." decimal="," decimals={0} /></h3>
            <p>Doações Arrecadadas</p>
            </div>
            <div className="impact-item">
            <h3><CountUp start={0} end={100} duration={5.5} />+</h3>
            <p>Projetos Realizados</p>
            </div>
        </div>
        </section>


        <section className="featured-campaigns">
        <div className="section-header"  data-aos="fade-up" >
            <h2>Instituições em Destaque</h2>
            <p>Conheça algumas instituições que estão mudando vidas.</p>
        </div>
        <div className="campaigns-grid" data-aos="fade-up">
            {/* Card 1 */}
            <div className="campaign-card">
                <div className="campaign-banner banner-educacao"></div>
                <div className="campaign-content">
                <h3>Hospital Pequeno Príncipe</h3>
                <p>O Pequeno Príncipe é mais do que o maior e mais completo hospital pediátrico do Brasil. É um centro de referência no qual se pratica, ensina e pesquisa o que há de mais moderno para o diagnóstico e o tratamento de crianças e adolescentes. É um hospital que se preocupa com a saúde dos seus pacientes, para além do tratamento das suas doenças.</p>
        
                <a href="/donation" className="btn-primary">Doar Agora</a>
                </div>
            </div>

            {/* Card 2 */}
            <div className="campaign-card">
                <div className="campaign-banner banner-saude"></div>
                <div className="campaign-content">
                <h3>Casa do Zezinho</h3>
                <p>A Casa do Zezinho é uma ONG localizada na zona sul de São Paulo conhecida como ‘Triângulo da Morte’, que engloba Capão Redondo, Jardim Ângela e Jardim São Luís. Fundada em 1994 por Dagmar Rivieri, pedagoga formada pela USP, mais conhecida como ‘Tia Dag’, a Casa do Zezinho busca acolher crianças e jovens em situação de vulnerabilidade social e oferecer, no contraturno escolar, duas refeições por dia e mais de 25 opções de oficinas socioeducativas.</p>
                <a href="/donation" className="btn-primary">Doar Agora</a>
                </div>
            </div>

            {/* Card 3 */}
            <div className="campaign-card">
                <div className="campaign-banner banner-alimento"></div>
                <div className="campaign-content">
                <h3>Banco de Alimnetos</h3>
                <p>Fundada em 1998, a ONG Banco de Alimentos é uma associação civil que recolhe alimentos que já perderam valor de prateleira no comércio e indústria, mas ainda estão aptos para consumo, e os distribui onde são mais necessários.</p>

                <a href="/donation" className="btn-primary">Doar Agora</a>
                </div>
            </div>
        </div>


        <div className="see-all-button">
            <a href="/institutions" className="btn-secondary">Todas as Instituições</a>
        </div>
        </section>

        {/* Como Funciona */}
        <section className="how-it-works">
        <div className="section-header" data-aos="fade-up">
            <h2>Como Funciona</h2>
            <p>Fazer a diferença é simples. Veja como você pode contribuir em apenas três passos.</p>
        </div>
        <div className="steps-grid" data-aos="fade-up">
            <div className='image-step1'>
                <div className="step">
                <h3>1. Escolha uma Causa</h3>
                <p>Encontre uma Instituição que ressoe com seus valores.</p>
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
        <div className="section-header" data-aos="fade-up">
            <h2>O Que Dizem Sobre Nós</h2>
            <p>Conheça histórias reais de transformação.</p>
        </div>
        <div className="testimonials-grid" data-aos="fade-up">
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
            <a href="/donation" className="btn-primary">Doe Agora</a>
            <a href="/login" className="btn-outline">Seja Voluntário</a>
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
