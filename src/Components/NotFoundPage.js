import React, { Component } from 'react'
import "./NotFoundPage.css";

import { Link } from "react-router-dom";

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center text-center">
        <div class="wrappers">
          <div className="d-flex justify-content-center">
            <span className='fw-bolder fs404'>4 </span>
            <img alt="404" className='imgsss h-50 w-50' src="https://staticdelivery.nexusmods.com/mods/1151/images/528-0-1447526230.png" />
            <span className='fw-bolder fs404'>4 </span>
          </div>
          <div className="text-align-center fst-italic h5">
            <p>Page Not Found</p>
          </div>
          <Link to={`/`}><button className='btn btn-light mt-3' type="button">GET ME HOME</button></Link>
        </div>
      </div>
    )
  }
}
