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

function DonorsList(){
    const navigate = useNavigate();
    const [donors, setDonors] = useState<Donor[]>([]);
    const [selectedOwnership, setSelectedOwnership] = useState<string>('');

    const fetchDonors = async () => {
        try {
            const response = await fetch(
            "http://localhost:8000/donor/list?offset=0&limit=6", 
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
    }, [selectedOwnership]);

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
                onChange={(e) => setSelectedOwnership(e.target.value)}
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
                key={donor.id}
                name={donor.name}
                imageUrl={donor.avatar_url}
                />
            ))}
            </div>
        </div>
        <Footer />
        </>
    );  
}

export default DonorsList;