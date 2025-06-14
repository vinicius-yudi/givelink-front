import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import './InstitutionDetailModal.css';  // Importando o CSS separado

interface InstitutionDetailModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  tags: string[];
  imageUrl: string;
  id?: number;
  cnpj: string;
  description: string;
}

export interface Institution {
  id: number;
  name: string;
  sector: string;
  avatar_url: string;
  cnpj: string;
  username: string;
  description: string;
}

const InstitutionDetailModal: React.FC<InstitutionDetailModalProps> = ({
  open,
  onClose,
  name,
  tags,
  imageUrl,
  id
}) => {
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';

      fetch(`http://localhost:8000/institution/${id}`)
        .then((res) => res.json())
        .then((data: Institution) => {
          setInstitution(data);
        })
        .catch((err) => {
          console.error('Erro ao buscar instituição:', err);
        });
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [open, id, onClose]);

  if (!open || !institution) return null;

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close-button"
        >
          <X className="icon" />
        </button>

        <div className="modal-body">
          <div className="modal-image-section">
            <img
              src={imageUrl}
              alt={name}
              className="modal-image"
            />
            <div className="modal-image-gradient" />
          </div>

          <div className="modal-info-section">
            <div className="modal-header">
              <h2>{name}</h2>
              <div className="modal-tags">
                {tags.map((tag, index) => (
                  <span key={index} className="modal-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-description">
              <h3>Sobre a Instituição</h3>
              <p>
                {institution.description}
              </p>
            </div>


            <div className="modal-contact">
              <h3>CNPJ</h3>
              <div className="contact-item">
                <span className="icon">🏢</span>
                <span>{institution.cnpj}</span>
              </div>

              <div className="modal-actions">
                <button
                    onClick={() => {
                        localStorage.setItem("institution_id", institution.id.toString());
                        window.location.href = "/Donation";
                    }}
                    className="donate-button"
                >
                    Fazer Doação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetailModal;
