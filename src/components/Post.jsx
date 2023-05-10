import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import TelegramIcon from '@mui/icons-material/Telegram';
import "./Post.css"
export default function Post() {
  return (
    <>
        <div className="postContainer">
            <div className="postProfileImageAndName">
            <img src="/images/Profile2.jpg" alt="Profile Pic" />
            <div className="d-flex flex-column">
            Yasir Khan
            <span className='fw-lighter timeago'>5 min ago</span>
            </div>
            </div>
            
            <img src="/images/Post2.jpg" alt="Postimage" />
            
            <div className="likeIcons">
                <FavoriteBorderIcon className='likeButton'/>
                <CommentIcon className='commentButton'/>
                <TelegramIcon className='shareButton'/>
            </div>

            <div className="noOfLikes">
                10 likes
            </div>
        </div>
    </>
  )
}
