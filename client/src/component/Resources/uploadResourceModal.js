import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
import { MdOutlineCancel } from "react-icons/md";
import { useJwt } from 'react-jwt';


const ResourceModal = ({ isOpen, setIsOpen, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });
  const token = localStorage.getItem('token');
  const {decodedToken,isExpired} =useJwt(token);
  const [file, setFile] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/resource',
        {
          resource: JSON.stringify({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            user_id: decodedToken.userId
          }),
          file: file
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    onSubmit(formData);
  };

  return (
    <div
      className="modal"
      style={{
        display: isOpen ? 'block' : 'none'
      }}
    >
      <div className="modal-content">
      <div className="cancel"onClick={() => setIsOpen(false)}><MdOutlineCancel /></div>

        <h2 className='submit-resource'>Submit Resource</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <div className="file-upload">
            <input
              accept="image/*, application/pdf"
              id="upload-file-button"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-file-button">Upload File</label>
            {file && <p>{file.name}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResourceModal;
