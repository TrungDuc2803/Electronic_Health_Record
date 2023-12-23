import React, { useState } from 'react';
import HospitalPageHeader from '../../Component/HospitalPageHeader';
import Footer from '../../Component/Footer';
import '../../../../CSS/Patient/PatientPage.css';
import '../../../../CSS/CreateAsset.css';

function CreatePatientPage() { 
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const [patientID, setpatientID] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [contactInfo, setcontactInfo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Construct both API endpoints
    const fabricEndpoint = '/api/create-patient-fabric';
    const mysqlEndpoint = '/api/create-patient-mysql';
  
    try {
      // Send a request to create a patient in the Fabric backend
      const fabricResponse = await fetch(`http://localhost:3001${fabricEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, patientID, firstName, lastName, dateOfBirth, gender, contactInfo }),
      });
  
      if (fabricResponse.ok) {
        console.log('Patient created in Fabric successfully');
      } else {
        console.error('Failed to create Patient in Fabric');
      }
  
      // Send a request to create a patient in the MySQL backend
      const mysqlResponse = await fetch(`http://localhost:3001${mysqlEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, patientID, firstName, lastName, dateOfBirth, gender, contactInfo }),
      });
  
      if (mysqlResponse.ok) {
        console.log('Patient created in MySQL successfully');
      } else {
        console.error('Failed to create Patient in MySQL');
      }
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };  

  return (
    <div className="patient-page">
    <HospitalPageHeader onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
    <div className="create-asset-container">
      <h1>Create Patient</h1>
      <form className="create-asset-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient ID:</label>
          <input type="text" value={patientID} onChange={(e) => setpatientID(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date Of Birth:</label>
          <input type="text" value={dateOfBirth} onChange={(e) => setdateOfBirth(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contact Info:</label>
          <input type="text" value={contactInfo} onChange={(e) => setcontactInfo(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="create-asset-button">Create Patient</button>
      </form>
    </div>
    <Footer />
  </div>
  );
}

export default CreatePatientPage;
