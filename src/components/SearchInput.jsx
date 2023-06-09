import React from 'react'
import './SearchInput.css'

export default function SearchInput(props) {
  return (
    <>
      <div className="container">

        <div className="row d-flex justify-content-center mt-3">

          <div className="col-md-6">

            <div className="search">
              <i className="fa fa-search"></i>
              <input type="text" className="form-control" placeholder={props.placeholder} ref={props.input}/>
              <button className="btn btn-primary" onClick={()=>{props.setOffset && props.setOffset(0);props.searchFunction();}}>{props.buttonName}</button>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
