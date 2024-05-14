import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Mainpage() {
  const [location, setLocation] = useState([]);
  const [episode, setEpisode] = useState([]);
  const [character, setCharacter] = useState([]);
  const bgimgloc = "url('https://i.ytimg.com/vi/cFq_XD6ltB8/maxresdefault.jpg')";
  const bgimgchar = "url('https://camo.githubusercontent.com/3183122085f4fcef6c3e537e0f6e03d6175913d9e8b0304f93147625f87c0ec3/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a6a353558477958345a47696d64306d6a4765595851512e706e67')";
  const bgimgep = "url('https://cdn.mos.cms.futurecdn.net/h4F9sAFM7FCP4pdwFz9ngW.jpg')";

  useEffect(() => {
    Axios.get("https://rickandmortyapi.com/api/episode").then((result) =>
      setEpisode(result.data.info)
    );
    Axios.get("https://rickandmortyapi.com/api/location").then((result) =>
      setLocation(result.data.info)
    );
    Axios.get("https://rickandmortyapi.com/api/character").then((result) =>
      setCharacter(result.data.info)
    );
  }, []);

  return (
    <div className="container wrapper">
      <div className="row">
        <div className="col text-center mb-5">
          <h1 className="display-4 mb-3">The Rick and Morty</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
          <Link to={`/location`}>
            <div style={{ backgroundImage: bgimgloc }} className="card card-has-bg border-danger">
              <div className="card-img-overlay">
                <div className="card-body text-center">
                  <h3 className="text-light">LOCATIONS</h3>
                </div>
                <div className="card-body">
                  <h5 className="text-light">Count: {location.count}</h5>
                  <h5 className="text-light">Page: {location.pages}</h5>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
          <Link to={`/character`}>
            <div style={{ backgroundImage: bgimgchar }} className="card card-has-bg border-danger">
              <div className="card-img-overlay">
                <div className="card-body text-center">
                  <h3 className="text-light">CHARACTERS</h3>
                </div>
                <div className="card-body">
                  <h5 className="text-light">Count: {character.count}</h5>
                  <h5 className="text-light">Page: {character.pages}</h5>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
          <Link to={`/episode`}>
            <div style={{ backgroundImage: bgimgep }} className="card card-has-bg border-danger">
              <div className="card-img-overlay">
                <div className="card-body text-center">
                  <h3 className="text-light">EPISODES</h3>
                </div>
                <div className="card-body">
                  <h5 className="text-light">Count: {episode.count}</h5>
                  <h5 className="text-light">Page: {episode.pages}</h5>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
