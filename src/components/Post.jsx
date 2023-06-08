import React, { useContext, useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import TelegramIcon from '@mui/icons-material/Telegram';
import "./Post.css"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import axios from 'axios';
import Context from '../context/contextapi';
TimeAgo.addDefaultLocale(en)





export default function Post(props) {
  const timeAgo = new TimeAgo('en-US')

  const contextData = useContext(Context);
    const [userData, setUserData] = useState("");
  
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/user/${props.userID}`);
            setUserData(result.data);
        }
        fetchData();
    }, [contextData.user.userID,props.userID])
  return (
    <>
        <div className="postContainer pb-3">
            <div className="postProfileImageAndName">
            <img src={userData.profileImagescr ? userData.profileImagescr : "/images/NoProfile.png"} alt="Profile Pic" />
            <div className="d-flex flex-column">
            {userData.username}
            <span className='fw-lighter timeago'>{timeAgo.format(new Date(props.createdAt))}</span>
            </div>
            </div>
            <p className='mb-2 mt-3 descriptionTextInPost'>{props.description}</p>
            <img  className='mt-0 mb-2' src={props.imgsrc} alt="Postimage" />
            
            <div className="likeIcons">
                <FavoriteBorderIcon className='likeButton'/>
                <CommentIcon className='commentButton'/>
                <TelegramIcon className='shareButton'/>
            </div>

            <div className="noOfLikes mt-1">
                {props.likedByUsers?props.likedByUsers.length:"0"} likes
            </div>
        </div>
    </>
  )
}
