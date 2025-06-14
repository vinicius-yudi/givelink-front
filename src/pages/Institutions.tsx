import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import InstitutionCard from '../components/InstitutionCard';
import Navbar from '../components/Navbar';
import '../styles/Institutions.css';
import { useEffect, useState } from 'react';
import { validateTokenJwtRedirectWithNoUseEffects } from '../utils/security';

interface Institution{
  id: number,
  name: string,
  sector: string,
  avatar_url: string,
  cnpj: string,
  username: string
}

const PAGE_SIZE = 6;

const InstitutionsList = () => {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedOwnership, setSelectedOwnership] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchInstitutions = async () => {
    try {
      const offset = (currentPage - 1) * PAGE_SIZE;

      const response = await fetch(
        `http://localhost:8000/institution/list?offset=${offset}&limit=${PAGE_SIZE}`, 
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
      setHasMore(data.institutions.length === PAGE_SIZE);
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
    }
  }

  const fetchLoggedUserInstitutions = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://localhost:8000/institution/list/me", 
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      setInstitutions(data.institutions);
      setHasMore(false);
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
    }
  }

  useEffect(() => {
    if (selectedOwnership === 'Minhas') {
      validateTokenJwtRedirectWithNoUseEffects(navigate, '/Institutions', '/Login');
      fetchLoggedUserInstitutions();
    } else {
      fetchInstitutions();
    }
  }, [selectedOwnership, currentPage]);

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
          <select 
            className="filter-dropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Filtrar por Categoria</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Solidariedade">Solidariedade</option>
            <option value="Comunidade">Comunidade</option>
          </select>
          <select 
            className="filter-dropdown"
            value={selectedOwnership}
            onChange={(e) => {
              setSelectedOwnership(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Minhas/Todas</option>
            <option value="Minhas">Minhas instituições</option>
            <option value="Todas">Todas</option>
          </select>
          <Link to="/InstitutionRegister" className="add-button">Cadastrar Nova Instituição</Link>
        </div>
        <div className="institutions-list">
          {institutions.map((institution) => (
            <InstitutionCard
              key={institution.id}
              id={institution.id}
              name={institution.name}
              tags={[institution.sector]}
              imageUrl={institution.avatar_url}
            />
          ))}
        </div>

        {selectedOwnership !== 'Minhas' && (
          <div className="pagination-controls">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="pagination-button"
            >
              ← Anterior
            </button>
            <span className="page-indicator">Página {currentPage}</span>
            <button
              disabled={!hasMore}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="pagination-button"
            >
              Próxima →
            </button>
          </div>
        )}

      </div>
      <Footer />
    </>
  );
};

export default InstitutionsList;
