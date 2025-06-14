import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import './InstitutionDetailModal.css';

interface DonorDetailModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  imageUrl: string;
  id?: number;
  cpfCnpj: string;
}

export interface Donor {
  id: number;
  name: string;
  avatar_url: string;
  cpf_cnpj: string;
  username: string;
}

const DonorDetailModal: React.FC<DonorDetailModalProps> = ({
  open,
  onClose,
  name,
  imageUrl,
  id,
  cpfCnpj
}) => {
  const [donor, setDonor] = useState<Donor | null>(null);
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

      fetch(`http://localhost:8000/donor/${id}`)
        .then((res) => res.json())
        .then((data: Donor) => {
          setDonor(data);
        })
        .catch((err) => {
          console.error('Erro ao buscar doador:', err);
        });
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [open, id, onClose]);

  if (!open || !donor) return null;

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
            </div>

            <div className="modal-contact">
              <h3>CPF/CNPJ</h3>
              <div className="contact-item">
                <span className="icon">🏢</span>
                <span>{donor.cpf_cnpj}</span>
              </div>

              <div className="modal-actions">
                <button
                    onClick={() => {
                        localStorage.setItem("donor_id", donor.id.toString());
                    }}
                    className="donate-button"
                >
                    Contatar - (41) 91919-9191
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDetailModal;