import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CreateAd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  // Učitaj sve kategorije sa backend-a
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Greška pri učitavanju kategorija:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      alert("Molimo izaberite kategoriju!");
      return;
    }

    try {
      const adData = { title, description, price, imageUrl };

      await api.post(`/ads?categoryId=${categoryId}`, adData, {
        withCredentials: true,
      });

      alert("Oglas uspešno kreiran!");
      navigate("/home");
    } catch (err) {
      console.error("Greška pri kreiranju oglasa:", err);
      alert("Došlo je do greške prilikom kreiranja oglasa.");
    }
  };

  return (
    <div className="create-ad-container">
      <h2>Kreiraj novi oglas</h2>
      <form onSubmit={handleSubmit} className="create-ad-form">
        <input
          type="text"
          placeholder="Naslov"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Opis oglasa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Cena"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="URL slike (opciono)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {/* Dropdown za izbor kategorije */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">-- Izaberite kategoriju --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit">Sačuvaj oglas</button>
      </form>
    </div>
  );
};

export default CreateAd;
