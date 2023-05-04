import React from 'react'
import './LeftBar.css'
export default function LeftBar() {
  return (
    <>
        <div className="profileImageAndName">
        <img src="/images/Profile1.jpg" alt="ProfilePic" className="ProfilePicture"/>
        <span className="Name">Yasir Khan</span>
        </div>
        <div className='Description'>
            <h4>Description</h4>
            <p>Hey I am a Software developer. It's nice to meet you</p>
            <hr />
            <p>Followers:350</p>
            <p>Following: 120</p>
            <hr />
        </div>
        <div className="friedList">

        </div>
    </>
  )
}
