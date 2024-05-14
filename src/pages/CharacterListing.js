import React, { useState, useEffect } from "react";
import { Label, Input, Button } from "reactstrap";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const status = [
  { label: "Any", value: "" },
  { label: "Alive", value: "Alive" },
  { label: "Dead", value: "Dead" },
  { label: "Unknown", value: "Unknown" },
];

const gender = [
  { label: "Any", value: "" },
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
  { label: "Genderless", value: "Genderless" },
  { label: "Unknown", value: "Unknown" },
];

function CharacterListing() {
  const [info, setInfo] = useState({});
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    Axios.get("https://rickandmortyapi.com/api/character").then((result) => {
      setCharacters(result.data.results);
      setInfo(result.data.info);
    });
  }, []);

  const pagination = (direction) => {
    const api = direction === "next" ? info.next : info.prev;
    Axios.get(api).then((result) => {
      setCharacters(result.data.results);
      setInfo(result.data.info);
    });
  };

  const search = () => {
    const sName = document.getElementById("searchName").value;
    const sType = document.getElementById("searchType").value;
    const sGender = document.getElementById("searchGender").value;
    const sStatus = document.getElementById("searchStatus").value;
    const sSpecies = document.getElementById("searchSpecies").value;
    const apiUrl = `https://rickandmortyapi.com/api/character/?name=${sName}&type=${sType}&species=${sSpecies}&status=${sStatus}&gender=${sGender}`;
    Axios.get(apiUrl).then((result) => {
      setCharacters(result.data.results);
      setInfo(result.data.info);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 mt-3">
          <Label for="searchName">Name</Label>
          <Input id="searchName" placeholder="Morty" type="text" />
        </div>
        <div className="col-md-3 mt-3">
          <Label for="searchType">Species</Label>
          <Input id="searchType" placeholder="Human" type="text" />
        </div>
        <div className="col-md-3 mt-3">
          <Label for="searchSpecies">Dimension</Label>
          <Input id="searchSpecies" placeholder="E.g" type="text" />
        </div>
        <div className="col-md-3 row m-0 p-0">
          <div className="col-sm-6 mt-3">
            <Label for="searchStatus">Status</Label>
            <Input id="searchStatus" name="select" type="select">
              {status.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
          </div>
          <div className="col-sm-6 mt-3">
            <Label for="searchGender">Gender</Label>
            <Input id="searchGender" name="select" type="select">
              {gender.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button onClick={search}>Search</Button>
        </div>
      </div>
      <div className="row">
        {characters.map((char) => (
          <div key={char.id} className="col-md-6 col-lg-4 col-xl-3 py-3 text-decoration-none">
            <Link to={`/character/${char.id}`}>
              <div className="card position-relative">
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  width: '15px',
                  height: '15px',
                  backgroundColor: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span className="badge text-white" style={{ fontSize: '8px' }}>{char.id}</span>
                </div>
                <img src={char.image} alt={char.name} className="w-100 card-img-top p-3 pb-0" />
                <div className="card-body ">
                  <div className="p-3 border border-1">
                    <div className="text-dark h5">{char.name.length > 21 ? `${char.name.slice(0, 18)}...` : char.name}</div>
                    <div>
                      <span className={`badge ${char.status === "Alive" ? "bg-success" : "bg-danger"}`}>{char.status}</span>
                    </div>
                    <div className="text-dark">{char.location.name.length > 30 ? `${char.location.name.slice(0, 27)}...` : char.location.name}</div>
                    <ul className="mb-0 list-inline mt-3">
                      <li>
                        <span className="text-dark">Species:</span>
                        <span className="mx-2">{char.species}</span>
                      </li>
                      <li>
                        <span className="text-dark">Gender:</span>
                        <span className="mx-2">{char.gender}</span>
                      </li>
                      <li>
                        <span className="text-dark">Played Episode:</span>
                        <span className="mx-2">{char.episode.length}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
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

export default CharacterListing;
