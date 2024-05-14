import React, { useState, useEffect } from 'react';
import { Table, Button, Label, Input } from 'reactstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function LocationListing() {
  const [info, setInfo] = useState([]);
  const [locations, setLocations] = useState([]);
  const [customLocations, setCustomLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const apiResult = await Axios.get("https://rickandmortyapi.com/api/location");
        setLocations(apiResult.data.results);
        setInfo(apiResult.data.info);

        // Fetch from Firestore
        const querySnapshot = await getDocs(collection(db, "customLocations"));
        const firestoreLocations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCustomLocations(firestoreLocations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLocations();
  }, []);


  const pagination = (direction) => {
    const api = direction === "next" ? info.next : info.prev;
    if (api) {
      Axios.get(api).then((result) => {
        setLocations(result.data.results);
        setInfo(result.data.info);
      });
    }
  };

  const search = () => {
    const sName = document.getElementById("searchName").value;
    const sType = document.getElementById("searchType").value;
    const sDimension = document.getElementById("searchDimension").value;
    const apiURL = `https://rickandmortyapi.com/api/location/?name=${sName}&type=${sType}&dimension=${sDimension}`;
    Axios.get(apiURL).then((result) => {
      setLocations(result.data.results);
      setInfo(result.data.info);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 mt-3">
          <Label for="searchName">Name</Label>
          <Input id="searchName" placeholder="Earth" type="text" />
        </div>
        <div className="col-md-4 mt-3">
          <Label for="searchType">Type</Label>
          <Input id="searchType" placeholder="Microverse" type="text" />
        </div>
        <div className="col-md-4 mt-3">
          <Label for="searchDimension">Dimension</Label>
          <Input id="searchDimension" placeholder="C-137" type="text" />
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button onClick={search}>Search</Button>
        </div>
      </div>
      <div className="row w-100">
        <Table dark hover responsive striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Dimension</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <th scope="row">{location.id}</th>
                <td><Link to={`/location/${location.id}`}>{location.name}</Link></td>
                <td>{location.type}</td>
                <td>{location.dimension}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <nav className="col-12 justify-content-center d-flex mt-5">
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link cursor" onClick={() => pagination("prev")}>Previous</button>
            </li>
            <li className="page-item">
              <button className="page-link cursor" onClick={() => pagination("next")}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default LocationListing;
