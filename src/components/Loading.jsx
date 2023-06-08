import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './Loading.css'
export default function Loading() {
  return (
    <>
        <div className="LoadingContainer d-flex align-items-center justify-content-center flex-column">
            <h1>Loading...</h1>
            <Spinner animation="border" variant="primary" className='LoadingSpinner'/>
        </div>
    </>
  )
}
