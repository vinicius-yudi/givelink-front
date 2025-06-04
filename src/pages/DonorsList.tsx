import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import DonorCard from "../components/DonorCard";
import '../styles/DonorsList.css';

interface Donor{
  id: number,
  name: string,
  avatar_url: string,
  cpf_cnpj: string,
  username: string
}

function DonorsList(){
    const [donors, setDonors] = useState<Donor[]>([]);

    useEffect(() => {
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
        };

        fetchDonors();
    }, []);

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