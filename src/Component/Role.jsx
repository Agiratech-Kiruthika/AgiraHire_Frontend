import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Roleform.css'; // Import CSS file

const RoleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7199/api/Auth/addRole', formData);
      console.log('Response:', response.data);
      // Reset form fields
      setFormData({
        name: '',
        description: ''
      });
      // Show success toast
      toast.success('Role added successfully!');
    } catch (error) {
      console.error('Error:', error);
      // Show error toast
      toast.error('Failed to add role. Please try again.');
    }
  };

  return (
    <div className="role-form-container">
      <h2>Role Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RoleForm;
