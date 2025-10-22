import React, { useState } from "react";
import api from "../api/api"; 

const UploadImage = ({ adId, onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await api.post(`/ads/${adId}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (onUpload) onUpload(response.data);
      setFile(null);
    } catch (err) {
      setError(err.response?.data || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadImage;
