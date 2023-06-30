import React, { useContext, useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import TelegramIcon from '@mui/icons-material/Telegram';
import "./Post.css"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import axios from 'axios';
import Context from '../context/contextapi';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
TimeAgo.addDefaultLocale(en)

export default function Post(props) {
  const timeAgo = new TimeAgo('en-US')
  const contextData = useContext(Context);
  const [userData, setUserData] = useState("");
  const [postIsLiked,setPostIsLiked]=useState(false);
  const [likesCount,setLikesCount]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/user/${props.userID}`);
      if(props.isLiked)
      setPostIsLiked(true);
      setLikesCount(props.likedByUsers.length);
      setUserData(result.data);
    }
    fetchData();
  }, [contextData.user.userID, props.userID,props.isLiked,props.likedByUsers.length])

  const likeAPost=async ()=>{
    if(postIsLiked===false){
      const result = await axios.patch(`/post/like/${contextData.user.userID}`,{id:props._id});
      if(result.status===200){ 
        props.updateAPost({...props,likedByUsers:[...props.likedByUsers,contextData.user.userID],isLiked:true},props.index);
        setLikesCount(likesCount+1);
        setPostIsLiked(true);
      }
      else{
        alert("Error Occurred while liking the post");
      }
    }
  }
  const dislikeAPost=async ()=>{
    if(postIsLiked===true){
      const result= await axios.patch(`/post/unlike/${contextData.user.userID}`,{id:props._id});
      if(result.status===200){
        props.updateAPost({...props,likedByUsers:props.likedByUsers.filter(element=>element!==contextData.user.userID),isLiked:false},props.index);
        setLikesCount(likesCount-1);
        setPostIsLiked(false);
      }else{
        alert("Error Occurred while unliking the post");
      }
    }
  }

  return (
    <>
      <div className="postContainer box-shadow pb-3">
       
        <div className="postProfileImageAndName">
        <Link to={`/profile/${userData._id}`}><img src={userData.profileImagescr ? userData.profileImagescr : "/images/NoProfile.png"} alt="Profile Pic" /></Link>
          <div className="d-flex flex-column">
          <Link to={`/profile/${userData._id}`} style={{ color:"#000",textDecoration: 'none' }}> {userData.username} </Link>
            <span className='fw-lighter timeago'>{timeAgo.format(new Date(props.createdAt))}</span>
          </div>
        </div>
        <p className='mb-2 mt-3 descriptionTextInPost'>{props.description}</p>
        <img className='mt-0 mb-2' src={props.imgsrc} alt="Postimage" />

        <div className="likeIcons">
          {postIsLiked?<FavoriteIcon onClick={dislikeAPost} className='likeButton'/>:<FavoriteBorderIcon onClick={likeAPost} className='likeButton' />}
          <CommentIcon className='commentButton' />
          <TelegramIcon className='shareButton' />
        </div>

        <div className="noOfLikes mt-1">
          {likesCount ? likesCount : "0"} likes
        </div>
      </div>
    </>
  )
}
