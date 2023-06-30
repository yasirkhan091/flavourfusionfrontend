import React, { useContext, useEffect, useRef, useState } from 'react'
import './Share.css'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';
import FormData from 'form-data'
import Context from '../context/contextapi';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function Share() {
    const contextData = useContext(Context);
    const navigate=useNavigate();
    const [userData, setUserData] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/user/${contextData.user.userID}`);
            setUserData(result.data);
        }
        fetchData();
    }, [contextData.user.userID])
    const descOfPost = useRef('');
    const [imgInPost, setPostImage] = useState('');
    const uploadThePost = async () => {
        let data = new FormData();
        data.append("description", descOfPost.current.value);
        data.append("postImage", imgInPost);
        data.append("userID", contextData.user.userID);
        const result = await axios.post('/post/newpost', data, {
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })
       if(result.data==="Post Uploaded Successfully")
       {
           alert("Post Uploaded Successfully");
           navigate(0);
       }
       else
       {
           setPostImage(null);
           alert("Error occured while uploading. Try Again Later");
       }
    }



    return (
        <>
            <div className="share box-shadow">
                <div className="profileInShare ">
                    <div className="shareImageWrapper">
                        <img src={userData.profileImagescr ? userData.profileImagescr : "/images/NoProfile.png"} alt="profilePiture" />
                    </div>
                    {/* <span>Yasir Khan</span>  */}
                    <div className="shareTextWrapper">

                        <input type="text" className="shareText" ref={descOfPost} placeholder="Type Something here..." />
                        <input type="file" className="d-none" onChange={(e) => { setPostImage(e.target.files[0]) }} id="postImage" name="postImage" />
                        <hr />
                    </div>
                </div>

                {imgInPost && (
                    <div className="position-relative text-center mb-3">
                        <img
                            alt="not found"
                            className='imageToBeUploaded'
                            src={URL.createObjectURL(imgInPost)}
                        />
                        <br />
                        <span className=' position-absolute top-0 end-0 imageToBeUploadedCloseIcon' onClick={() => setPostImage(null)}><CloseIcon/></span>
                    </div>
                )}
                    
                <div className="shareIconsWrapper d-flex align-items-center justify-content-around flex-wrap">
                    <label htmlFor="postImage">
                        <div className="ShareIcons ">
                            <AddPhotoAlternateIcon className='sharePhotos' /><span className=' d-none  d-lg-block'>Photos/Videos</span>
                        </div>
                    </label>
                    <div className="ShareIcons">
                        <EmojiEmotionsIcon className='shareEmotions' /><span className=' d-none  d-lg-block'>Emotions</span>
                    </div>
                    <div className="ShareIcons ">
                        <LocationOnIcon className='shareLocation' /><span className=' d-none  d-lg-block'>Location</span>
                    </div>
                    <label htmlFor="submitButtonInShare">
                        <Button variant="contained" className='mx-auto' onClick={imgInPost?uploadThePost:()=>{}}>Post</Button>
                    </label>
                </div>
            </div>
        </>
    )
}
