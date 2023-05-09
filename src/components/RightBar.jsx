import React from 'react'
import './RightBar.css'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const SuggestedProfile=()=>{
    return (
      <>
        <div className="suggestedProfile d-flex align-items-center mb-3">
          <img src="/images/Profile1.jpg" className='rounded-circle me-3' alt="SuggestedProfile" />
          <span className='me-auto'>Yasir Khan</span> 
          <PersonAddAlt1Icon className='personAddIcon rounded'/>
        </div>
      </>
    );
}

export default function RightBar() {
  return (
    <>
        <div className="friendsSuggestion pb-2">
          <h4 className='mb-3'>Friend Suggestion</h4>
          <SuggestedProfile/>
          <SuggestedProfile/>
          <SuggestedProfile/>
          <SuggestedProfile/>
          <SuggestedProfile/>
          <hr className='mb-2'/>
          <a href="/" className='seeMoreLink d-block text-center'>See more</a>
        </div>
    </>
  )
}
