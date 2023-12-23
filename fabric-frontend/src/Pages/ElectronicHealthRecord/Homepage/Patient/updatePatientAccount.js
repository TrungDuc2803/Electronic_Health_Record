import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../Login/UserContext';
import PatientHeader from '../Component/PatientHeader';
import Footer from '../Component/Footer';
import '../../../CSS/Patient/PatientPage.css';
import '../../../CSS/UpdateAsset.css'

function UpdatePatientAccount() {
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const { userID } = useParams(); // Access the userID parameter from the URL
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useUser();
  const { DateTime } = require('luxon');
  const timestamp = DateTime.now().toISO();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a request to update the asset with the provided data
    const response = await fetch('http://localhost:3001/api/update-account', {
      method: 'PUT', // Use PUT request for updating
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: user.Username, password, userType: user.UserType, userID, timestamp }),
    });

    if (response.ok) {
      // Asset update was successful
      setMessage('Account updated successfully');
      setError('');
    } else if (response.status === 404) {
      // Asset does not exist
      setError('The account does not exist');
      setMessage('');
    } else {
      // Asset update failed
      setError('Failed to account patient');
      setMessage('');
    }
  };

  return (
  <div className="patient-page">
    <PatientHeader onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
    <div className="update-asset-container">
      <h1>Update Account</h1>
      <form onSubmit={handleSubmit} className="update-asset-form">
        <div className="form-group">
          <label>Input your new password:</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="update-asset-button">Update Account</button>
      </form>
      <p className="update-status-message">{message}</p>
    </div>
    <Footer />
  </div>
  );
}

export default UpdatePatientAccount;