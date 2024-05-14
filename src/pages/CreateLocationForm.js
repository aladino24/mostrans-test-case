import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { db } from '../firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const CreateLocationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    dimension: '',
    residents: []
  });
  const [locations, setLocations] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === "residents") {
      setFormData({ ...formData, [e.target.name]: e.target.value.split(',') });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'locations'), {
        ...formData,
        created: new Date()
      });
      console.log('Document written with ID: ', docRef.id);
      alert('Location added successfully!');
      setFormData({
        name: '',
        type: '',
        dimension: '',
        residents: []
      });
      fetchLocations(); 
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to add location');
    }
  };

  const fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'locations'));
      const fetchedLocations = [];
      querySnapshot.forEach((doc) => {
        fetchedLocations.push({ id: doc.id, ...doc.data() });
      });
      setLocations(fetchedLocations);
    } catch (error) {
      console.error('Error fetching locations: ', error);
    }
  };

  useEffect(() => {
    fetchLocations(); 
  }, []);

  return (
    <div className="container mt-5 col-6">
      <h1>Create New Location</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dimension">Dimension:</label>
          <input
            type="text"
            className="form-control"
            id="dimension"
            name="dimension"
            value={formData.dimension}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">Add Location</button>
      </form>
      <div className="mt-4">
        <h2>Locations</h2>
        <ul>
          {locations.map(location => (
            <li key={location.id}>
              <Link to={`/location-custom/${location.id}`}>{location.name}</Link> {/* Ubah menjadi Link */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateLocationForm;
