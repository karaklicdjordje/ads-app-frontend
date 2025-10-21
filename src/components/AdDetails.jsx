import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await api.get(`/ads/${id}`);
        setAd(res.data);
      } catch (err) {
        console.error('Error fetching ad details:', err);
      }
    };
    fetchAd();
  }, [id]);

  if (!ad) return <p>Loading ad details...</p>;

  return (
    <div className="ad-details">
      <button onClick={() => navigate('/home')}>← Back to Ads</button>
      <h2>{ad.title}</h2>
      {ad.imageUrl && <img src={ad.imageUrl} alt={ad.title} className="ad-details-img" />}
      <table>
        <tbody>
          <tr><td><strong>Description:</strong></td><td>{ad.description}</td></tr>
          <tr><td><strong>Price:</strong></td><td>${ad.price}</td></tr>
          <tr><td><strong>Category:</strong></td><td>{ad.category?.name}</td></tr>
          <tr><td><strong>Owner:</strong></td><td>{ad.owner?.username}</td></tr>
          <tr><td><strong>Created:</strong></td><td>{new Date(ad.createdAt).toLocaleString()}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdDetails;
