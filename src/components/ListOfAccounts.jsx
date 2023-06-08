import React from 'react'
import './ListOfAccounts.css'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const SuggestedProfile=(props)=>{
    return (
      <>
        <div className={props.Profile?"suggestedProfile d-flex align-items-center mb-3":"suggestedProfileHomePage d-flex align-items-center mb-3"}>
          <img src="/images/Profile2.jpg" className='rounded-circle me-3' alt="SuggestedProfile" />
          <span className={props.Profile?'me-auto':'me-auto fs-5'}>Yasir Khan</span> 
          {props.Profile?"":<PersonAddAlt1Icon className='personAddIcon rounded'/>}
        </div>
      </>
    );
}

export default function ListOfAccounts(props) {
  return (
    <div className={props.Profile?"friendsSuggestion pb-2 mx-auto followerSuggestion":"friendsSuggestion pb-2 mx-auto"}>
          <h4 className='mb-3'>{props.Profile?"Followers":"Friend Suggestion"}</h4>
          {props.Profile?<SuggestedProfile Profile/>:<SuggestedProfile/>}
          {props.Profile?<SuggestedProfile Profile/>:<SuggestedProfile/>}
          {props.Profile?<SuggestedProfile Profile/>:<SuggestedProfile/>}
          {props.Profile?<SuggestedProfile Profile/>:<SuggestedProfile/>}
          {props.Profile?<SuggestedProfile Profile/>:<></>}
          <hr className='mb-2'/>
          {props.Profile?"":<a href="/" className='seeMoreLink d-block text-center'>See more</a>}
    </div>
  )
}
