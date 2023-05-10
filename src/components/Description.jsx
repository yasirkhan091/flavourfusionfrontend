import React from 'react'
import { Link } from 'react-router-dom'
import './Description.css'

export default function Description(props) {
  return (
    <>
        <div className={props.Profile?'Description DescriptionProfile':'Description'}>
        <div className={props.Profile?"profileImageAndName profileImageAndNameInProfilePage":"profileImageAndName"}>
          <img src="/images/Cover4.jpg" alt="CoverPic " className={props.Profile?'coverPictureInDescription coverPictureInDescriptionProfile':'coverPictureInDescription'}/>
          <img src="/images/Profile2.jpg" alt="ProfilePic" className={props.Profile?"ProfilePicture ProfilePictureInProfilePage":"ProfilePicture"} />
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
        <hr className='mb-2'/>
        {props.Profile?"":<Link to="/profile" className='seeMoreLink'>See more</Link>}     
      </div>

    </>
  )
}
