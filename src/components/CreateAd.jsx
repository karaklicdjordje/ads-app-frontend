import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import UploadImage from "./UploadImage";

const CreateAd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [createdAdId, setCreatedAdId] = useState(null); // set ID 

  // Load all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error!:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      alert("Please choose the category!");
      return;
    }

    try {
      // 1. Create ad without the picture
      const adData = { title, description, price }; 
      const res = await api.post(`/ads?categoryId=${categoryId}`, adData, {
        withCredentials: true,
      });

      const newAd = res.data;
      setCreatedAdId(newAd.id); // save ID new ad
      alert("Ad added! You can now upload an image.");
    } catch (err) {
      console.error("Error!:", err);
      alert("Error creating ad.");
    }
  };

  return (
    <div className="create-ad-container">
      <h2>Create new ad</h2>
      {!createdAdId ? (
        // Form
        <form onSubmit={handleSubmit} className="create-ad-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          {/* Dropdown for category */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">-- Choose the category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button type="submit">Save ad</button>
        </form>
      ) : (
        // Upload image 
        <div>
          <h3>Upload image for your ad</h3>
          <UploadImage
            adId={createdAdId}
            onUpload={(url) => {
              setImageUrl(url);
              alert("Image uploaded successfully!");
              navigate("/home"); // navigate to the home page after create
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateAd;
