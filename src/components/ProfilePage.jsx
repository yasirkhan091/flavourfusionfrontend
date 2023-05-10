import React from 'react'
import Header from './Header'
import LeftBar from './LeftBar'
import MiddleBar from './MiddleBar'
import RightBar from './RightBar'

import './ProfilePage.css'

export default function ProfilePage() {
  return (
    <>
        <Header/>

        <div className="container-fluid homeBackground">
          <div className="row g-md-0">
              <div className="col-12 col-md-3 mx-auto leftBar">
                  <LeftBar Profile/>
              </div>
              <div className="col-12 col-md-5 mx-auto middleBar">
                  <MiddleBar Profile/>
              </div>
              <div className="col-12 col-md-4 mx-auto d-flex flex-column align-items-center rightBar">
                  <RightBar Profile/>
              </div>
          </div>
       </div>
    </>
  )
}
