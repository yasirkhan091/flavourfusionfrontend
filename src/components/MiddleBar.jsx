import React, { useContext, useEffect, useState } from 'react'
import Share from './Share'
import './MiddleBar.css'
import Post from './Post'
import Description from './Description'
import Context from '../context/contextapi'
import axios from 'axios'
import { useParams } from 'react-router-dom'
export default function MiddleBar(props) {
  const contextData = useContext(Context);
  const [timelinePosts,setTimeLinePost]=useState([]);
  const {id}=useParams();
  useEffect(() => {
      const fetchData = async () => {
          let urlOfthePage="timeline";
          let urlID=contextData.user.userID;
          if(props.Profile){
            urlOfthePage='userposts';
            urlID=id;
          }
          const timeline=await axios.get(`/post/${urlOfthePage}/${urlID}`);
          console.log(timeline);
          if(timeline.data&& timeline.data.length===0){
            const randomPosts=await axios.get(`/post/randomPosts`);
            setTimeLinePost(randomPosts.data);
          }else{
            setTimeLinePost(timeline.data);
          }
          // if(timeline.data && timeline.data.length===0)
          // setMessage("No Posts to show");
      }
      fetchData();
  }, [contextData.user.userID,props.Profile,id]);

  const updateAPost= (postData,index)=>{
    setTimeLinePost((value)=>{
        value[index]=postData;
        return value;
    })
  }

  return (
    <>

      {timelinePosts.length!==0?(props.Profile?<Description Profile {...props}/>:<Share/>):(<h3 className=' fw-lighter'>Loading</h3>)}
      {
       timelinePosts.map((element,index)=>{
        let isLiked=false;
        if(element.likedByUsers.find(element=>element===contextData.user.userID)){
          isLiked=true;
        }
       return (<Post {...element} index={index} key={index} isLiked={isLiked} updateAPost={updateAPost} />)
      })}
    </>
  )
}
