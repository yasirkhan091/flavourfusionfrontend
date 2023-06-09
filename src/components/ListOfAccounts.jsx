import React, { useContext, useEffect, useState } from 'react'
import './ListOfAccounts.css'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import axios from 'axios'
import Context from '../context/contextapi'

const SuggestedProfile=(props)=>{
    return (
      <>
        <div className={props.Profile?"suggestedProfile d-flex align-items-center mb-3":"suggestedProfileHomePage d-flex align-items-center mb-3"}>
          <img src={props.profileImagescr?props.profileImagescr:"/images/NoProfile.png"} className='rounded-circle me-3' alt="SuggestedProfile" />
          <span className={props.Profile?'me-auto':'me-auto fs-5'}>{props.username?props.username:"No Username"}</span> 
          {props.Profile?"":<PersonAddAlt1Icon className='personAddIcon rounded'/>}
        </div>
      </>
    );
}

export default function ListOfAccounts(props) {
  const contextData=useContext(Context);
  const [accountList,setAccountList]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      const result= await axios.get(`/user/followers/${contextData.user.userID}`);
      if(result.status===200)
      setAccountList(result.data);
      else{
        console.log("Error In fetching followers");
      }
    }
    fetchData();
  },[contextData.user.userID])

  return (
    <div className={props.Profile?"friendsSuggestion mx-auto pb-2 followerSuggestion":"friendsSuggestion pb-2 mx-auto"}>
          <h4 className='mb-3'>{props.Profile?"Followers":"Friend Suggestion"}</h4>
          {accountList.length>0?accountList.map(element=>{return (props.Profile?<SuggestedProfile {...element} Profile/>:<SuggestedProfile {...element}/>)}):"No Followers Yet!"}
          <hr className='mb-2'/>
          {props.Profile?"":<a href="/" className='seeMoreLink d-block text-center'>See more</a>}
    </div>
  )
}
