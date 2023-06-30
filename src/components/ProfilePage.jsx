import React, { useEffect, useState } from 'react'
import Header from './Header'
import LeftBar from './LeftBar'
import MiddleBar from './MiddleBar'
import RightBar from './RightBar'
import './ProfilePage.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function ProfilePage() {
  const [profileUserData, setProfileUserData] = useState();
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/user/${id}`);
      setProfileUserData(result.data);
    }
    fetchData();
  }, [profileUserData, id]);
  return (
    <>
      <Header />

      <div className="container-fluid homeBackground">
        <div className="row g-md-0">
          <div className="col-12 col-md-3 mx-auto leftBar">
            <LeftBar Profile profileUserData={profileUserData} chageInProfileUserDataFunction={setProfileUserData}/>
          </div>
          <div className="col-12 col-md-5 mx-auto middleBar">
            <MiddleBar Profile {...profileUserData} chageInProfileUserDataFunction={setProfileUserData}/>
          </div>
          <div className="col-12 col-md-4 mx-auto d-flex flex-column align-items-center rightBar">
            <RightBar Profile {...profileUserData}/>
          </div>
        </div>
      </div>
    </>
  )
}
