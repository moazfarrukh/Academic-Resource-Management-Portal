import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
import { MdOutlineCancel } from "react-icons/md";
import { useJwt } from 'react-jwt';


const PlaylistModal = ({ isOpen, setIsOpen, onSubmit }) => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const token = localStorage.getItem('token');
  const {decodedToken,isExpired} =useJwt(token);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/playlist',
        {
          playlist: JSON.stringify({
            name: formData.name,
            description: formData.description,
            user_id: decodedToken.userId
          }),
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
    onSubmit(formData);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
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

        <h2 className='submit-playlist'>Submit Playlist</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PlaylistModal;
