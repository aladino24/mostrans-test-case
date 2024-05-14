import React, { useState, useEffect } from "react";
import Axios from "axios";

function LocationCharacter() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const htmlLink = window.location.href;
    const id = htmlLink.split("/")[4];
    Axios.get(`https://rickandmortyapi.com/api/location/${id}`)
      .then((response) => {
        const { residents } = response.data;
        fetchCharacters(residents);
      })
      .catch((error) => console.error('Error fetching location details:', error));
  }, []);

  const fetchCharacters = (residents) => {
    const requests = residents.map(url => Axios.get(url));
    Axios.all(requests)
      .then(Axios.spread((...responses) => {
        const charactersData = responses.map(res => res.data);
        setCharacters(charactersData);
        setLoading(false);
      }))
      .catch(error => console.error('Error fetching characters:', error));
  };

  return (
    <div className="container text-dark bg-light p-5">
      <div className="h4 mb-3">Characters in this Location:</div>
      {loading ? <p>Loading characters...</p> :
        <div className="row">
          {characters.map((character) => (
            <div className="col-md-4 mb-4" key={character.id}>
              <div className="card">
                <img src={character.image} alt={character.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{character.name}</h5>
                  <p className="card-text">Species: {character.species}</p>
                  <p className="card-text">Status: {character.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default LocationCharacter;
