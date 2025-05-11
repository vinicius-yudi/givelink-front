import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import InstitutionCard from '../components/InstitutionCard';
import Navbar from '../components/Navbar';
import '../styles/Institutions.css';
import { useEffect, useState } from 'react';

interface Institution{
  id: number,
  name: string,
  sector: string,
  avatar_url: string,
  cnpj: string,
  username: string
}

const InstitutionsList = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/institution/list?offset=0&limit=6", 
          {
            method: "GET",
            headers: {
              "Accept": "application/json"
            },
          });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        setInstitutions(data.institutions);
      } catch (error) {
        console.error("Erro ao buscar instituições:", error);
      }
    };

    fetchInstitutions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="institution-page">
        <div className="institutions-controls">
          <input
            type="text"
            className="search-bar"
            placeholder="Pesquisar instituições..."
          />
          <select className="filter-dropdown">
            <option value="">Filtrar por Categoria</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Solidariedade">Solidariedade</option>
            <option value="Comunidade">Comunidade</option>
          </select>
          <Link to="/InstitutionRegister" className="add-button">Cadastrar Nova Instituição</Link>
        </div>
        <div className="institutions-list">
          {institutions.map((institution) => (
            <InstitutionCard
              key={institution.id}
              name={institution.name}
              tags={[institution.sector]}
              imageUrl={institution.avatar_url}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstitutionsList;
