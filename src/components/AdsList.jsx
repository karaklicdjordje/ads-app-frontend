import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Učitaj kategorije pri pokretanju
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

  // Učitaj oglase (filtrirane po nazivu ili kategoriji)
  const fetchAds = async () => {
    try {
      let url = "/ads";
      const params = [];

      if (searchTerm.trim()) params.push(`title=${encodeURIComponent(searchTerm)}`);
      if (selectedCategory) params.push(`categoryId=${selectedCategory}`);

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const res = await api.get(url);
      setAds(res.data);
    } catch (err) {
      console.error("Greška pri učitavanju oglasa:", err);
    }
  };

  // Učitaj oglase kada se promeni pretraga ili kategorija
  useEffect(() => {
    fetchAds();
  }, [searchTerm, selectedCategory]);

  return (
    <div className="ads-container">
      <h2>📦 Svi oglasi</h2>

      {/* Sekcija za filtere */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Pretraži po nazivu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">Sve kategorije</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button onClick={() => navigate("/create-ad")}>➕ Novi oglas</button>
      </div>

      {/* Lista oglasa */}
      <div className="ads-grid">
        {ads.length === 0 ? (
          <p>Nema oglasa koji odgovaraju pretrazi.</p>
        ) : (
          ads.map((ad) => (
            <div
              key={ad.id}
              className="ad-card"
              onClick={() => navigate(`/ads/${ad.id}`)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <h3>{ad.title}</h3>
              <p>
                <strong>Cena:</strong> ${ad.price}
              </p>
              {ad.category && (
                <p>
                  <strong>Kategorija:</strong> {ad.category.name}
                </p>
              )}
              {ad.imageUrl && (
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="ad-img"
                  style={{ width: "200px", borderRadius: "5px" }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdsList;
