import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await api.get(`/ads/${id}`);
        setAd(res.data);
      } catch (err) {
        console.error("Error loading ad:", err);
      }
    };
    fetchAd();
  }, [id]);

  if (!ad) return <p>Loading...</p>;

  return (
    <div className="ad-details">
      <h2>{ad.title}</h2>
      <p>{ad.description}</p>
      <p><strong>Price:</strong> ${ad.price}</p>
      <p><strong>Category:</strong> {ad.category?.name}</p>

      {/* 🖼️ Ovde prikazujemo sliku ako postoji */}
      {ad.imageUrl ? (
        <img
          src={ad.imageUrl}
          alt={ad.title}
          style={{ width: "300px", borderRadius: "10px", marginTop: "10px" }}
        />
      ) : (
        <p style={{ fontStyle: "italic" }}>No image uploaded</p>
      )}
    </div>
  );
};

export default AdDetails;
