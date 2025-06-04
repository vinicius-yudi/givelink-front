import React from 'react';
import '../components/DonorCard.css';

interface DonorCardProps {
  name: string;
  imageUrl: string;
}

const DonorCard: React.FC<DonorCardProps> = ({ name, imageUrl }) => {
  return (
    <div className="donor-card">
      <img src={imageUrl} alt={name} />
      <div className="donor-card-content">
        <h3>{name}</h3>
        <div className="donor-card-buttons">
          <button className="donor-card-button">Saiba Mais</button>
        </div>
      </div>
    </div>
  );
};

export default DonorCard;