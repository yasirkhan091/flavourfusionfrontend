import React from 'react'
import Header from './Header'
import LeftBar from './LeftBar'
import MiddleBar from './MiddleBar'
import RightBar from './RightBar'
import './Home.css'

export default function Home() {
  return (
    <>
       <Header/>
       <div className="container-fluid homeBackground">
          <div className="row g-md-0">
              <div className="col-10 col-md-3 mx-auto leftBar">
                  <LeftBar/>
              </div>
              <div className="col-10 col-md-5 mx-auto middleBar">
                  <MiddleBar/>
              </div>
              <div className="col-10 col-md-4 mx-auto d-flex flex-column align-items-center rightBar">
                  <RightBar/>
              </div>
          </div>
       </div>
    </>
  )
}
