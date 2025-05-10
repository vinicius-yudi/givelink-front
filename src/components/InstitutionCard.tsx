import React from 'react';
import '../components/InstitutionCard.css';

interface InstitutionCardProps {
  name: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ name, description, tags, imageUrl }) => {
  return (
    <div className="institution-card">
      <img src={imageUrl} alt={name} />
      <div className="institution-card-content">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="institution-card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="institution-card-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="institution-card-buttons">
          <button className="institution-card-button">Doar</button>
          <button className="institution-card-button">Saiba Mais</button>
        </div>
      </div>
    </div>
  );
};

export default InstitutionCard;
