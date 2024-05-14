import React, { Component } from "react";
import Axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap"; // Import Modal components from reactstrap
import { db } from '../firebase-config';
import { collection, getDocs,getDoc, doc, updateDoc } from 'firebase/firestore';

export default class DetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalOpen: false,
      locations: [],
      selectedLocationId: '',
    };
  }

  componentDidMount() {
    var htmlLink = window.location.href;
    var id = htmlLink.split("/")[4];
    var page = htmlLink.split("/")[3];
    Axios.get(`https://rickandmortyapi.com/api/${page}/${id}`).then((result) =>
      this.setState({
        data: result.data,
      })
    );
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));

    if (!this.state.modalOpen) {
      this.fetchLocations();
    }
  }

  fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'locations'));
      const locations = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      this.setState({ locations });
    } catch (error) {
      console.error('Error fetching locations: ', error);
    }
  };

  assignCharacter = async () => {
    const { data, selectedLocationId } = this.state;
    if (!selectedLocationId) {
      alert('Please select a location.');
      return;
    }

    try {
      const locationRef = doc(db, 'locations', selectedLocationId);

      const locationDoc = await getDoc(locationRef);
      const locationData = locationDoc.data();

      if (!locationData.residents) {
        locationData.residents = [];
      }

      locationData.residents.push(`https://rickandmortyapi.com/api/character/${data.id}`);

      await updateDoc(locationRef, { residents: locationData.residents });

      alert(
        `Character ${data.name} has been assigned to location ${locationData.name}.`
      )

      this.toggleModal();
    } catch (error) {
      console.error('Error assigning character:', error);
    }
}


  render() {
    const { id, image, name, dimension, residents, characters, species, episode, type, gender, air_date, status, origin } = this.state.data;
    return (
      <div className="container text-dark bg-light p-5">
        <div className="row d-flex justify-content-between">
          <div className="col-md-6">
            {image && (<div className="mb-4"><img src={image} alt={`${name}-img`} style={{ maxWidth: '100%' }} /></div>)}
          </div>
          <div className="col-md-6">
            <div className="h3">{name}</div>
            {status && (<div className="badge bg-success">{status}</div>)}
            <hr />
            {id && (<div><span className="h6">ID</span>: {id}</div>)}
            {dimension && (<div><span className="h6">Dimension</span>: {dimension}</div>)}
            {residents && (<div><span className="h6">Number of Residents</span>: {residents.length}</div>)}
            {characters && (<div><span className="h6">Characters</span>: {characters.length}</div>)}
            {episode && window.location.href.split("/")[3] !== "character" && (<div><span className="h6">Episode</span>: {episode}</div>)}
            {type ? (<div><span className="h6">Type</span>: {type}</div>) : (<div><span className="h6">Type</span>: Unknown</div>)}
            {species && (<div><span className="h6">Species</span>: {species}</div>)}
            {origin && (<div><span className="h6">Origin Location</span>: {origin.name}</div>)}
            {gender && (<div><span className="h6">Gender</span>: {gender}</div>)}
            {air_date && (<div><span className="h6">Air Date</span>: {air_date}</div>)}

            {status && species && (
              <Button className="mt-3" onClick={this.toggleModal} color="primary">
                Tambahkan ke Custom Lokasi
              </Button>
            )}
          </div>
          <hr className="mt-5" />
        </div>

        {/* Modal for selecting a location */}
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Select Location</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="locationSelect">Location:</Label>
              <Input type="select" name="select" id="locationSelect" onChange={(e) => this.setState({ selectedLocationId: e.target.value })}>
                <option value="">Select a location...</option>
                {this.state.locations.map(location => (
                  <option key={location.id} value={location.id}>{location.name}</option>
                ))}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.assignCharacter}>Assign</Button>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
