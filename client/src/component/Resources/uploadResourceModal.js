import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useJwt } from 'react-jwt';
import User from '../../../../server/models/user';

const ResourceModal = ({ isOpen, onClose, onSubmit }) => {

    const token = localStorage.getItem("token")
    const { decodedToken, isExpired } = useJwt(token);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media: '',
    category: '',
    file: null, // Store the uploaded file here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/resource', {
                resource: {title: formData.title,
                     description: formData.description,
                     category: formData.category,
                    user_id: decodedToken.id},
                file: formData.file
            });
            const data = response.data;
            console.log(data);
            
            
           
        } catch (error) {
            console.error(error);
        }
        setUploadPageStatus(!uploadPageStatus);
    

    onSubmit(formData);
  };

  return (
    <Modal open={isOpen} onClose={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Submit Resource
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Media"
            name="media"
            value={formData.media}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              accept="image/*, application/pdf" // Set accepted file types
              id="upload-file-button"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="upload-file-button">
              <Button variant="contained" component="span">
                Upload File
              </Button>
            </label>
            {formData.file && <Typography>{formData.file.name}</Typography>}
          </Box>
          <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: 'black', marginTop: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ResourceModal;
