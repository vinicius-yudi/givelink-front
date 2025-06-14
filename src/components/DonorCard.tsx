import React, { useState } from 'react';
import '../components/DonorCard.css';
import DonorDetailModal from './DonorDetailModal';

interface DonorCardProps {
  name: string;
  imageUrl: string;
  id: number;
}

const DonorCard: React.FC<DonorCardProps> = ({ id, name, imageUrl }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleInfoClick = () => {
    localStorage.setItem("donor_id", id.toString());
  };

  return (
    <>
      <div className="donor-card">
        <img src={imageUrl} alt={name} />
        <div className="donor-card-content">
          <h3>{name}</h3>
          <div className="donor-card-buttons">
            <button className="donor-card-button" onClick={
                () => {
                  setModalOpen(true);
                  handleInfoClick();
                }
              }>Saiba Mais</button>
          </div>
        </div>
      </div>
      <DonorDetailModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        name={name}
        imageUrl={imageUrl} 
        cpfCnpj={''} 
        id={Number(localStorage.getItem('donor_id'))}    
      />
    </>
  );
};

export default DonorCard;