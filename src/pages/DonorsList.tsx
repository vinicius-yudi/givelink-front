import { Link, useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import DonorCard from "../components/DonorCard";
import '../styles/DonorsList.css';
import { validateTokenJwtRedirectWithNoUseEffects } from "../utils/security";

interface Donor{
  id: number,
  name: string,
  avatar_url: string,
  cpf_cnpj: string,
  username: string
}

const PAGE_SIZE = 6;

function DonorsList(){
    const navigate = useNavigate();
    const [donors, setDonors] = useState<Donor[]>([]);
    const [selectedOwnership, setSelectedOwnership] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchDonors = async () => {
        try {
            const offset = (currentPage - 1) * PAGE_SIZE;

            const response = await fetch(
            `http://localhost:8000/donor/list?offset=${offset}&limit=${PAGE_SIZE}`, 
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
            setDonors(data.donors);
            setHasMore(data.donors.length === PAGE_SIZE);
        } catch (error) {
            console.error("Erro ao buscar doadores:", error);
        }
    }

    const fetchLoggedUserDonors = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(
            "http://localhost:8000/donor/list/me", 
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
            setDonors(data.donors);
            setHasMore(false);
        } catch (error) {
            console.error("Erro ao buscar doadores:", error);
        }
    }

    useEffect(() => {
        if (selectedOwnership === 'Minhas') {
            validateTokenJwtRedirectWithNoUseEffects(navigate, '/donors-list', '/Login');
            fetchLoggedUserDonors();
        } else {
            fetchDonors();
        }
    }, [selectedOwnership, currentPage]);

    return (
        <>
        <Navbar />
        <div className="donor-page">
            <div className="donors-controls">
            <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar doadores..."
            />
            <select 
                className="filter-dropdown"
                value={selectedOwnership}
                onChange={(e) => {
                    setSelectedOwnership(e.target.value);
                    setCurrentPage(1);
                    }}
            >
                <option value="">Meus/Todos</option>
                <option value="Minhas">Meus doadores</option>
                <option value="Todas">Todos</option>
            </select>
            <Link to="/Donors" className="add-button">Cadastrar Novo Doador</Link>
            </div>
            <div className="donors-list">
            {donors.map((donor) => (
                <DonorCard
                id={donor.id}
                name={donor.name}
                imageUrl={donor.avatar_url}
                />
            ))}
            </div>

            {selectedOwnership !== 'Meus doadores' && (
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
}

export default DonorsList;