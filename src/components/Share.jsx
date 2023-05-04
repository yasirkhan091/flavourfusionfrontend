import React from 'react'
import './Share.css'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';

export default function Share() {
    return (
        <>
            <div className="share">
                <div className="profileInShare">
                    <img src="/images/Profile1.jpg" alt="profilePiture" />
                    <span>Yasir Khan</span> 
                </div>
                <input type="text" className="shareText" placeholder="Share your thoughts and emotions here" />
                <hr />
                <div className="shareIconsWrapper">
                <div className="ShareIcons ">
                    <AddPhotoAlternateIcon className='sharePhotos'/>Photos/Videos
                </div>
                <div className="ShareIcons">
                    <EmojiEmotionsIcon className='shareEmotions'/>Emotions
                </div>
                <div className="ShareIcons ">
                    <LocationOnIcon className='shareLocation'/>Location
                </div>
                <Button variant="contained" className='mx-auto'>Post</Button>
                </div>
            </div>
        </>
    )
}