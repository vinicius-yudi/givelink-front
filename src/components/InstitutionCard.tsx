import React, { useState } from 'react';
import '../components/InstitutionCard.css';
import { Link } from 'react-router-dom';
import InstitutionDetailModal from './InstitutionDetailModal';

interface InstitutionCardProps {
  id: number,
  name: string;
  tags: string[];
  imageUrl: string;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ id, name, tags, imageUrl }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDonateClick = () => {
    localStorage.setItem("institution_id", id.toString());
  };

  const handleInfoClick = () => {
    localStorage.setItem("institution_id", id.toString());
  };

  return (
    <>
      <div className="institution-card">
        <img src={imageUrl} alt={name} />
        <div className="institution-card-content">
          <h3>{name}</h3>
          <div className="institution-card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="institution-card-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="institution-card-buttons">
            <Link to="/Donation" className="institution-card-button" onClick={handleDonateClick}>Doar</Link>
            <button className="institution-card-button" onClick={
              () => {
                setModalOpen(true);
                handleInfoClick();
              }
            }>Saiba Mais</button>
          </div>
        </div>
      </div>
      <InstitutionDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        name={name}
        tags={tags}
        imageUrl={imageUrl} 
        cnpj={''} 
        description={''}
        id={Number(localStorage.getItem('institution_id'))}      
      />
    </>
  );
};

export default InstitutionCard;
