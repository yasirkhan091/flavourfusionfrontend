import React from 'react'
import './LeftBar.css'
export default function LeftBar() {
  return (
    <>
      <div className='Description'>
        <div className="profileImageAndName">
          <img src="/images/Cover2.jpg" alt="CoverPic " className='coverPictureInDescription' />
          <img src="/images/Profile1.jpg" alt="ProfilePic" className="ProfilePicture" />
        </div>
          <span className="Name">Yasir Khan</span>
        <p>Hey I am a Software developer. It's nice to meet you</p>
        <hr />
        <div className="countBoxWrapper">
        <div className="countBox">
        <p>Followers</p>
        <p>350</p>
        </div>
        <div className="countBox">
        <p>Followings</p>
        <p>120</p>
        </div>
        <div className="countBox lastBox">
        <p>Posts</p>
        <p>4</p>
        </div>
        </div>
        <hr />
        <a href="/" className='seeMoreLink'>See more</a>
      </div>

      <div className="friedList">

      </div>
    </>
  )
}
