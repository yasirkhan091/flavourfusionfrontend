import React from 'react'
import './Info.css'
import EditIcon from '@mui/icons-material/Edit';
export default function Info() {
  return (
    <>
        <div className="infoWrapper box-shadow mx-auto">
            <h4 className='d-flex align-item-center'><span className='fw-bold mb-3 me-auto d-block'>Your Info</span> <EditIcon role='button'/> </h4>
            <p><span className='fw-bold'>Status </span> Single</p>
            <p><span className='fw-bold'>Lives in </span> Noida</p>
            <p><span className='fw-bold'>Works/Studies at</span> JIIT, Noida</p>
        </div>
    </>
  )
}
