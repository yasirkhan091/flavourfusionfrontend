import React, { useContext, useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Description.css'
import axios from 'axios'
import Context from '../context/contextapi'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import UploadIcon from '@mui/icons-material/Upload';
import DoneIcon from '@mui/icons-material/Done';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FormData from 'form-data'
import EditIcon from '@mui/icons-material/Edit';

export default function Description(props) {
  const contextData=useContext(Context);
  const [userData,setUserData]=useState("");
  // const [currentUserData,setCurrentUserData]=useState('');
  const [isFollowed,setIsFollowed]=useState(false);
  const {id}=useParams();     //Id of user whose profile is opened
  const [profileImage,setProfileImage]=useState('');
  const [coverImage,setCoverImage]=useState('');
  // const description=useRef();
  useEffect(()=>{
    const fetchData=async()=>{
      const resultForCurrentUser= await axios.get(`/user/${contextData.user.userID}`);
      if(props.Profile && id!==contextData.user.userID)
      {
        const isInFollowingOrNot= resultForCurrentUser.data.followings.find(element=>element===id);
        if(isInFollowingOrNot)
        setIsFollowed(true);
        else
        setIsFollowed(false);
      }
      if(props.Profile){
        setUserData(props);
      }
      else
      setUserData(resultForCurrentUser.data);
    }
    fetchData();
  },[contextData.user.userID,id,props.Profile,isFollowed,props])

  const followUserFunction=async()=>{
        const result= await axios.patch(`/user/follow/${contextData.user.userID}`,{id});
        if(result.status===200){
          setIsFollowed(true);
          props.chageInProfileUserDataFunction({...props});
        }else{
          console.log("Error in following the user");
        }
  }

  const unfollowUserFunction=async()=>{
    const result= await axios.patch(`/user/unfollow/${contextData.user.userID}`,{id});
    if(result.status===200){
      setIsFollowed(false);
      props.chageInProfileUserDataFunction({...props});
    }else{
      console.log("Error in unfollowing the user");
    }
}
  const uploadTheImage=async (args)=>{
    const data= new FormData();
    args==="profilepic"?data.append("profileImage",profileImage):data.append("coverImage",coverImage);
    const result =args==="profilepic"? await axios.patch(`/user/uploadProfilePic/${contextData.user.userID}`, data, {
      headers: {
          'accept': 'application/json',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
  }):
  await axios.patch(`/user/uploadCoverPic/${contextData.user.userID}`, data, {
    headers: {
        'accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    }
});
    if(result.status===200)
    {
      alert("Image Uploaded Successfully");
      args==="profilepic"?props.chageInProfileUserDataFunction({...props,profileImagescr:URL.createObjectURL(profileImage)}):
      props.chageInProfileUserDataFunction({...props,coverImagescr:URL.createObjectURL(coverImage)});
      args==="profilepic"?setProfileImage(''):setCoverImage('');
    }else{
      alert("Cannot Upload the Image");
      args==="profilepic"?setProfileImage(''):setCoverImage('');
    }
  }


  return (
    <>
        <div className={props.Profile?'Description box-shadow DescriptionProfile':'Description box-shadow'}>
        <div className={props.Profile?"profileImageAndName profileImageAndNameInProfilePage":"profileImageAndName"}>
          <img src={profileImage?URL.createObjectURL(profileImage): (userData.profileImagescr?userData.profileImagescr:"/images/NoProfile.png")} alt="ProfilePic" className={props.Profile?"ProfilePicture ProfilePictureInProfilePage":"ProfilePicture"} />
          <img src={coverImage?URL.createObjectURL(coverImage):(userData.coverImagescr?userData.coverImagescr:"/images/NoCoverPic.JPG")} alt="CoverPic " className={props.Profile?'coverPictureInDescription coverPictureInDescriptionProfile':'coverPictureInDescription'}/>
          {/* Below Elements are for uploading profile picture and cover picture */}
          {props.Profile && contextData.user.userID === id && <input id="profileImage" name="profileImage" onChange={(e)=>{setProfileImage(e.target.files[0])}} className=" d-none" type="file"/>}
          {props.Profile && contextData.user.userID === id && <input id="coverImage" name="coverImage" onChange={(e)=>{setCoverImage(e.target.files[0])}} className=" d-none" type="file"/>}
          {props.Profile && contextData.user.userID === id && (profileImage?<div className="iconsInProfilePage text-center d-flex align-items-center justify-content-center" onClick={()=>{uploadTheImage("profilepic")}}><DoneIcon className='DoneIconInProfilePage'/> </div> :<label htmlFor='profileImage'> <div className="iconsInProfilePage text-center d-flex align-items-center justify-content-center"><AddAPhotoIcon className='uploadImageIcon'/> </div> </label>)}
          {props.Profile && contextData.user.userID === id && (coverImage?<div className="iconsInProfilePage coverImageInProfilePagePosition text-center d-flex align-items-center justify-content-center" onClick={()=>{uploadTheImage("coverpic")}}> <DoneIcon className='DoneIconInProfilePage'/> </div>:<label htmlFor='coverImage'> <div className="iconsInProfilePage coverImageInProfilePagePosition text-center d-flex align-items-center justify-content-center"><UploadIcon className='uploadImageIcon'/> </div> </label>)}
          {props.Profile && contextData.user.userID === id && profileImage && <div className="d-flex align-items-center justify-content-center iconsInProfilePage removeIconInProfilePage" onClick={()=>{setProfileImage('')}}><RemoveCircleIcon onClick={()=>{setProfileImage('')}}/></div>}
          {props.Profile && contextData.user.userID === id && coverImage && <div className="d-flex align-items-center justify-content-center iconsInProfilePage removeIconInProfilePageForCover" onClick={()=>{setCoverImage('')}}><RemoveCircleIcon onClick={()=>{setCoverImage('')}}/></div>}
        </div>
        {<span className='Name position-relative'>{userData.username?userData.username:"No Username"} {props.Profile && (contextData.user.userID!== id && (isFollowed? <PersonRemoveIcon onClick={unfollowUserFunction} className='personAddIconInDescription position-absolute rounded'/> :<PersonAddAlt1Icon onClick={followUserFunction} className='personAddIconInDescription position-absolute rounded'/>))}</span> }
        <p>{userData.description?userData.description:"No Description Added"} {props.Profile && contextData.user.userID === id &&<div className="editIconInProfilePageBackground d-inline-flex ms-1 displayFlexContainer"><EditIcon className="editIconInProfilePage"/></div>} </p>
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
        {props.Profile?"":<Link to={`/profile/${contextData.user.userID}`} className='seeMoreLink'>See more</Link>}     
      </div>

    </>
  )
}
