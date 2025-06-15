import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../styles/Resources.css';
import { FaTrash, FaEdit } from "react-icons/fa";

const PAGE_SIZE = 6;

type User = {
  id: number;
  username: string;
  email: string;
  avatar_url: string;
  role: string;
};

type Donor = {
  id: number;
  name: string;
  avatar_url: string;
  cpf_cnpj: string;
  username: string;
};

type Institution = {
  id: number;
  name: string;
  sector: string;
  avatar_url: string;
  cnpj: string;
  username: string;
  description: string;
};

function Resources() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [editingItem, setEditingItem] = useState<User | Donor | Institution | null>(null);
  const [formData, setFormData] = useState<any>({});


  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    fetchData(1);
  }, [selectedType]);

  const fetchData = async (page: number) => {
    const offset = (page - 1) * PAGE_SIZE;
    let url = "";
    if (selectedType === "Usuários") {
      url = `http://localhost:8000/user/list?offset=${offset}&limit=${PAGE_SIZE}`;
    } else if (selectedType === "Doadores") {
      url = `http://localhost:8000/donor/list?offset=${offset}&limit=${PAGE_SIZE}`;
    } else if (selectedType === "Instituições") {
      url = `http://localhost:8000/institution/list?offset=${offset}&limit=${PAGE_SIZE}`;
    } else {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
    );
      const data = await response.json();

      if (selectedType === "Usuários") {
        if (page === 1) setUsers(data.users);
        else setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < PAGE_SIZE) setHasMore(false);
      } else if (selectedType === "Doadores") {
        if (page === 1) setDonors(data.donors);
        else setDonors((prev) => [...prev, ...data.donors]);
        if (data.donors.length < PAGE_SIZE) setHasMore(false);
      } else if (selectedType === "Instituições") {
        if (page === 1) setInstitutions(data.institutions);
        else setInstitutions((prev) => [...prev, ...data.institutions]);
        if (data.institutions.length < PAGE_SIZE) setHasMore(false);
      }
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchData(nextPage);
  };

  const renderList = () => {
    const handleDelete = async (id: number) => {
    let endpoint = "";
    if (selectedType === "Usuários") {
      endpoint = `http://localhost:8000/user/${id}`;
    } else if (selectedType === "Doadores") {
      endpoint = `http://localhost:8000/donor/${id}`;
    } else if (selectedType === "Instituições") {
      endpoint = `http://localhost:8000/institution/${id}`;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        if (selectedType === "Usuários") {
          setUsers((prev) => prev.filter((u) => u.id !== id));
        } else if (selectedType === "Doadores") {
          setDonors((prev) => prev.filter((d) => d.id !== id));
        } else if (selectedType === "Instituições") {
          setInstitutions((prev) => prev.filter((i) => i.id !== id));
        }
      } else {
        console.error("Erro ao deletar:", await response.text());
      }
    } catch (error) {
      console.error("Erro na requisição DELETE:", error);
    }
  };

  const deleteButton = (id: number) => (
    <button className="delete-button" onClick={() => handleDelete(id)} title="Deletar">
      <FaTrash />
    </button>
  );

  const handleEdit = (item: User | Donor | Institution) => {
    setEditingItem(item);
    setFormData({ ...item });
  };

  const editButton = (item: User | Donor | Institution) => (
    <button
        className="edit-button"
        onClick={() => handleEdit(item)}
        title="Editar"
        style={{ marginRight: "0px" }}
    >
        <FaEdit />
    </button>
    );

  if (selectedType === "Usuários") {
    return users.map((user) => (
      <div key={user.id} className="card">
        <img src={user.avatar_url} alt={user.username} />
        <div style={{ flex: 1 }}>
          <strong>{user.username}</strong>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
        {editButton(user)}
        {deleteButton(user.id)}
      </div>
    ));
  } else if (selectedType === "Doadores") {
    return donors.map((donor) => (
      <div key={donor.id} className="card">
        <img src={donor.avatar_url} alt={donor.name} />
        <div style={{ flex: 1 }}>
          <strong>{donor.name}</strong>
          <p>{donor.username}</p>
          <p>{donor.cpf_cnpj}</p>
        </div>
        {editButton(donor)}
        {deleteButton(donor.id)}
      </div>
    ));
  } else if (selectedType === "Instituições") {
    return institutions.map((institution) => (
      <div key={institution.id} className="card">
        <img src={institution.avatar_url} alt={institution.name} />
        <div style={{ flex: 1 }}>
          <strong>{institution.name}</strong>
          <p>{institution.sector}</p>
        </div>
        {editButton(institution)}
        {deleteButton(institution.id)}
      </div>
    ));
  } else {
    return <p>Selecione uma categoria para visualizar os dados.</p>;
  }
  };

  const renderEditForm = () => {
    if (!editingItem) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleCancel = () => {
        setEditingItem(null);
        setFormData({});
    };

    const handleSubmit = async () => {
        let endpoint = "";
        if (selectedType === "Usuários") {
            endpoint = `http://localhost:8000/user/${editingItem?.id}`;
        } else if (selectedType === "Doadores") {
            endpoint = `http://localhost:8000/donor/${editingItem?.id}`;
        } else if (selectedType === "Instituições") {
            endpoint = `http://localhost:8000/institution/${editingItem?.id}`;
        }

        try {
            const token = localStorage.getItem("access_token");

            const fullData = {
            ...editingItem,
            ...formData,
            };

            const response = await fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(fullData),
            });

            if (response.ok) {
            alert("Atualizado com sucesso!");
            fetchData(currentPage);
            setEditingItem(null);
            setFormData({});
            } else {
            const error = await response.text();
            console.error("Erro ao atualizar:", error);
            alert(`Erro: ${error}`);
            }
        } catch (error) {
            console.error("Erro na requisição PUT:", error);
            alert("Erro na requisição.");
        }
        };

    return (
        <div className="edit-overlay">
        <div className="edit-card">
            <h2>Editar {selectedType.slice(0)}</h2>
            <div className="form-fields">
            {selectedType === "Usuários" && (
            <>
                <div className="form-group">
                <label>Username</label>
                <input name="username" value={formData.username || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Password</label>
                <input name="password" type="password" value={formData.password || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Avatar URL</label>
                <input name="avatar_url" value={formData.avatar_url || ""} onChange={handleChange} />
                </div>
            </>
            )}

            {selectedType === "Doadores" && (
            <>
                <div className="form-group">
                <label>Nome</label>
                <input name="name" value={formData.name || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Avatar URL</label>
                <input name="avatar_url" value={formData.avatar_url || ""} onChange={handleChange} />
                </div>
            </>
            )}

            {selectedType === "Instituições" && (
            <>
                <div className="form-group">
                <label>Nome</label>
                <input name="name" value={formData.name || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Setor</label>
                <input name="sector" value={formData.sector || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Avatar URL</label>
                <input name="avatar_url" value={formData.avatar_url || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Descrição</label>
                <textarea name="description" value={formData.description || ""} onChange={handleChange} />
                </div>
            </>
            )}

            </div>
            <div className="form-buttons">
            <button onClick={handleSubmit} className="save-button">Salvar</button>
            <button onClick={handleCancel} className="cancel-button">Cancelar</button>
            </div>
        </div>
        </div>
    );
    };

  return (
    <>
      <Navbar />
      <div className="resources-page p-4">
        <div className="resources-controls mb-4">
          <select
            className="filter-dropdown"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Geral</option>
            <option value="Usuários">Usuários</option>
            <option value="Doadores">Doadores</option>
            <option value="Instituições">Instituições</option>
          </select>
        </div>

        <div className="resources-list space-y-4">
          {renderList()}
        </div>

        {hasMore && selectedType && (
          <div className="text-center mt-4">
            <button className="load-more-button" onClick={handleLoadMore}>
              Carregar mais
            </button>
          </div>
        )}
      </div>
      {renderEditForm()}
      <Footer />
    </>
  );
}

export default Resources;
