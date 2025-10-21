import React, { useEffect, useState } from "react";
import api from "../api/api"; // use api.js

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
    categoryName: "", // for selected category
  });

  useEffect(() => {
    fetchMyAds();
  }, []);

  const fetchMyAds = async () => {
    try {
      const res = await api.get("/ads/my-ads");
      setAds(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      description: ad.description,
      price: ad.price,
      categoryId: ad.category.id,
      categoryName: ad.category.name,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/ads/${editingAd.id}`, {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category: { id: formData.categoryId }, // object send 
      });
      setEditingAd(null);
      fetchMyAds();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>My Ads</h2>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id} style={{ marginBottom: "20px" }}>
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
            <p>Price: ${ad.price}</p>
            <p>Category: {ad.category?.name || "N/A"}</p>
            <button onClick={() => handleEditClick(ad)}>Edit</button>
          </li>
        ))}
      </ul>

      {editingAd && (
        <div style={{ marginTop: "30px" }}>
          <h3>Edit Ad</h3>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            placeholder="Category Name"
          />
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            placeholder="Category ID"
          />
          <div style={{ marginTop: "10px" }}>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEditingAd(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAds;
