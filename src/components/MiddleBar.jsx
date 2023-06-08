import React, { useContext, useEffect, useState } from 'react'
import Share from './Share'
import './MiddleBar.css'
import Post from './Post'
import Description from './Description'
import Context from '../context/contextapi'
import axios from 'axios'
export default function MiddleBar(props) {
  const contextData = useContext(Context);
  const [timelinePosts,setTimeLinePost]=useState([]);
  useEffect(() => {
      const fetchData = async () => {
          let urlOfthePage="timeline";
          if(props.Profile)
          urlOfthePage='userposts';
          const timeline=await axios.get(`/post/${urlOfthePage}/${contextData.user.userID}`);
          setTimeLinePost(timeline.data);
      }
      fetchData();
  }, [contextData.user.userID,props.Profile]);

  console.log(timelinePosts);
  return (
    <>

      {timelinePosts.length!==0?(props.Profile?<Description Profile/>:<Share/>):(<h3 className=' fw-lighter'>Loading....</h3>)}
      {
       timelinePosts.map((element,index)=>{
       return (<Post {...element} key={index} />)
      })}
    </>
  )
}
