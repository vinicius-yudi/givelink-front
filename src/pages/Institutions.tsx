import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import InstitutionCard from '../components/InstitutionCard';
import Navbar from '../components/Navbar';
import '../styles/Institutions.css';

const institutions = [
  {
    id: 1,
    name: "Hospital Pequeno Príncipe",
    description: "Ajude a salvar vidas de crianças em todo o Brasil.",
    tags: ["Saúde", "Infantil", "Hospital"],
    imageUrl: "https://s2-g1.glbimg.com/ETe86Ud3wmZXrzp-dSYI1yD2_k8=/0x0:4288x2848/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/A/L/UTXju1S5uDUBzCny4DOQ/pauta-1-1-.jpg",
  },
  {
    id: 2,
    name: "Casa do Rio",
    description: "Educação e desenvolvimento sustentável na Amazônia.",
    tags: ["Educação", "Meio Ambiente"],
    imageUrl: "https://dtrasprafrente.wordpress.com/wp-content/uploads/2011/02/greenpeace-logo2.jpg?w=584",
  },
  {
    id: 3,
    name: "Instituto Ayrton Senna",
    description: "Transformando a educação no Brasil.",
    tags: ["Educação", "Infantil"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Instituto_Ayrton_Senna_-_Logo.png/640px-Instituto_Ayrton_Senna_-_Logo.png",
  },
  {
    id: 4,
    name: "Cáritas Brasileira",
    description: "Apoio a comunidades em situação de vulnerabilidade.",
    tags: ["Solidariedade", "Comunidade"],
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnHJhkalzzelLwTMdakYlsry3XChX6-xJg0w&s",
  },

];

const InstitutionsList = () => {
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
              description={institution.description}
              tags={institution.tags}
              imageUrl={institution.imageUrl}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstitutionsList;
