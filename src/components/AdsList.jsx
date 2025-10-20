import { useEffect, useState } from 'react';
import api from '../api/api';

const AdsList = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await api.get('/ads');
        setAds(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAds();
  }, []);

  return (
    <div>
      <h2>Lista oglasa</h2>
      <ul>
        {ads.map(ad => (
          <li key={ad.id}>
            <strong>{ad.title}</strong> - {ad.description} (${ad.price})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdsList;
