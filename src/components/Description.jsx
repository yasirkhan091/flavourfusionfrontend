import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Description.css'
import axios from 'axios'
import Context from '../context/contextapi'

export default function Description(props) {
  const contextData=useContext(Context);
  const [userData,setUserData]=useState("");
  useEffect(()=>{
    const fetchData=async()=>{
      const result= await axios.get(`/user/${contextData.user.userID}`);
      setUserData(result.data);
    }
    fetchData();
  },[contextData.user.userID])

  return (
    <>
        <div className={props.Profile?'Description DescriptionProfile':'Description'}>
        <div className={props.Profile?"profileImageAndName profileImageAndNameInProfilePage":"profileImageAndName"}>
          <img src={userData.coverImagescr?userData.coverImagescr:"/images/NoCoverPic.JPG"} alt="CoverPic " className={props.Profile?'coverPictureInDescription coverPictureInDescriptionProfile':'coverPictureInDescription'}/>
          <img src={userData.profileImagescr?userData.profileImagescr:"/images/NoProfile.png"} alt="ProfilePic" className={props.Profile?"ProfilePicture ProfilePictureInProfilePage":"ProfilePicture"} />
        </div>
          <span className="Name">{userData.username}</span>
        <p>{userData.description?userData.description:"No Description Added"}</p>
        <hr />
        <div className="countBoxWrapper">
        <div className="countBox">
        <p>Followers</p>
        <p>{userData.followers?userData.followers.length:0}</p>
        </div>
        <div className="countBox">
        <p>Followings</p>
        <p>{userData.followings?userData.followings.length:0}</p>
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
