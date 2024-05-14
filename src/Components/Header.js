import React, { Component } from "react";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src="/logoR2.png" alt="Rick and Morty" width="50" height="50" />
            </a>
            <button className="navbar-toggler" type="button" onClick={this.toggle} aria-controls="navbarNav" aria-expanded={this.state.isOpen ? "true" : "false"} aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${this.state.isOpen ? 'show' : ''} collapse navbar-collapse`} id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/location/">Locations</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/character/">Characters</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/episode/">Episodes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/add-location/">Custom Location</a>
                </li>
              </ul>
              <span className="navbar-text">
              <a className="nav-link" href="#">GitHub</a>
              </span>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
