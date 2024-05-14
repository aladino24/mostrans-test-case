import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import { db } from '../firebase-config';
import { collection, getDoc,getDocs, doc, updateDoc } from 'firebase/firestore';

export default class LocationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null, 
      modalOpen: false,
      locations: [],
      selectedLocationId: '',
    };
  }

  componentDidMount() {
    const { id } = this.props; 
    this.fetchData(id); 
    this.fetchLocations(); 
  }

  async fetchData(id) {
    try {
      const locationRef = doc(db, 'locations', id); 
      const locationDoc = await getDoc(locationRef);
      if (locationDoc.exists()) {
        this.setState({ data: locationDoc.data() }); 
      } else {
        console.error('Location not found.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  }
  

  toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
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

  
      locationData.residents.push({ id: data.id, name: data.name });

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
    const { data, modalOpen, locations, selectedLocationId } = this.state; 
    if (!data) {
      return <div>Loading...</div>; 
    }
    return (
      <div className="container text-dark bg-light p-5">
        <div className="row d-flex justify-content-between">
          <div className="col-md-6">
            {data.image && (<div className="mb-4"><img src={data.image} alt={`${data.name}-img`} style={{ maxWidth: '100%' }} /></div>)}
          </div>
          <div className="col-md-6">
            <div className="h3">{data.name}</div>
            {data.status && (<div className="badge bg-success">{data.status}</div>)}
            <hr />
            {data.id && (<div><span className="h6">ID</span>: {data.id}</div>)}
            {data.dimension && (<div><span className="h6">Dimension</span>: {data.dimension}</div>)}
            {data.residents && (<div><span className="h6">Number of Residents</span>: {data.residents.length}</div>)}
       
            {data.status && data.species && (
              <Button className="mt-3" onClick={this.toggleModal} color="primary">
                Tambahkan ke Custom Lokasi
              </Button>
            )}
          </div>
          <hr className="mt-5" />
        </div>

        {/* Modal for selecting a location */}
        <Modal isOpen={modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Select Location</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="locationSelect">Location:</Label>
              <Input type="select" name="select" id="locationSelect" value={selectedLocationId} onChange={(e) => this.setState({ selectedLocationId: e.target.value })}>
                <option value="">Select a location...</option>
                {locations.map(location => (
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
