import React, { useState } from "react";
import axios from "axios";

const MediaUpload = () => {
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!media) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("file", media);
    formData.append("upload_preset", "fixMyCity_preset"); 
    formData.append("cloud_name", "dnkuwjegy"); 

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dx12345ab/upload", // apna cloud name lagana
        formData
      );
      setUploadedUrl(res.data.secure_url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-4 border rounded w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Upload Image/Video</h2>

      <input type="file" onChange={handleFileChange} className="mb-2" />

      {preview && (
        <div className="mb-2">
          <p className="text-sm">Preview:</p>
          {media.type.startsWith("video") ? (
            <video src={preview} controls width="100%" />
          ) : (
            <img src={preview} alt="preview" className="w-full rounded" />
          )}
        </div>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {uploadedUrl && (
        <div className="mt-3">
          <p className="text-sm font-semibold">Uploaded:</p>
          {uploadedUrl.endsWith(".mp4") ? (
            <video src={uploadedUrl} controls width="100%" />
          ) : (
            <img src={uploadedUrl} alt="uploaded" className="w-full rounded" />
          )}
          <p className="text-xs text-gray-500 break-all">{uploadedUrl}</p>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
