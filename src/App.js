import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { Component } from "react";

import Mainpage from "./pages/Mainpage";
import Episode from "./pages/EpisodeListing";
import Location from "./pages/LocationListing";
import Character from "./pages/CharacterListing";
import LocationCharacter from "./pages/LocationCharacter";
import Header from "./Components/Header";
import DetailCard from "./Components/DetailCard";
import NotFoundPage from "./Components/NotFoundPage";
import CreateLocationForm from "./pages/CreateLocationForm";
import LocationDetail from "./pages/LocationDetail";
// import Footer from "./Components/Footer";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="p-5">
            <Header />
          </div>

          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/episode" element={<Episode />} />
            <Route path="/location" element={<Location />} />
            <Route path="/character" element={<Character />} />
            <Route path="/episode/:Id" element={<DetailCard />} />
            <Route path="/character/:Id" element={<DetailCard />} />
            <Route path="/add-location" element={<CreateLocationForm />} />
            <Route path="/location/:Id" element={
              <>
                <DetailCard />
                <LocationCharacter />
              </>
            } />
           
            <Route path='*' exact={true} element={<NotFoundPage />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </div>
    );
  }
}

