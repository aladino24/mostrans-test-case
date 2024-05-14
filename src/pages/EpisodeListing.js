import React, { useState, useEffect } from "react";
import { Table, Label, Input, Button } from "reactstrap";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function EpisodeListing() {
  const [info, setInfo] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    Axios.get("https://rickandmortyapi.com/api/episode").then((result) => {
      setEpisodes(result.data.results);
      setInfo(result.data.info);
    });
  }, []);

  const pagination = (direction) => {
    const api = direction === "next" ? info.next : info.prev;
    if (api) {
      Axios.get(api).then((result) => {
        setEpisodes(result.data.results);
        setInfo(result.data.info);
      });
    }
  };

  const search = () => {
    const sName = document.getElementById("searchName").value;
    const sEpisode = document.getElementById("searchEpisode").value;
    const apiURL = `https://rickandmortyapi.com/api/episode/?name=${sName}&episode=${sEpisode}`;
    Axios.get(apiURL).then((result) => {
      setEpisodes(result.data.results);
      setInfo(result.data.info);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-3">
          <Label for="searchName">Name</Label>
          <Input id="searchName" placeholder="Pilot" type="text" />
        </div>
        <div className="col-md-6 mt-3">
          <Label for="searchEpisode">Episode</Label>
          <Input id="searchEpisode" placeholder="S01" type="text" />
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
              <th>Air Date</th>
              <th>Episode</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => (
              <tr key={episode.id}>
                <th scope="row">{episode.id}</th>
                <td><Link to={`/episode/${episode.id}`}>{episode.name}</Link></td>
                <td>{episode.air_date}</td>
                <td>{episode.episode}</td>
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

export default EpisodeListing;
