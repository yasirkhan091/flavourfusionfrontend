import React, { useContext } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Context from '../context/contextapi';
// import FastfoodIcon from '@mui/icons-material/Fastfood';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);
  const LogoutFunction = async () => {
    try {
      const result = await axios.delete("/auth/logout");
      if (result.data === "LogOut Successful") {
        dispatch({ type: "LogOut" });
        navigate('/login', { replace: true });
      }
      else {
        alert("Error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light Navbar box-shadow">
        <div className="container-fluid">
          <Link className="navbar-brand ms-5 fw-bold " to="/"><span className='text-primary'>FlavourFusion</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-item-center  ">

              <li className="nav-item nav-Item position-relative d-flex align-items-center justify-content-center me-2 searchBarHeader">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <SearchIcon className='position-absolute end-0 searchIconHeader' />
              </li>

              <Link to='/chat'>
                <li className="nav-item nav-icon-Item d-flex align-items-center justify-content-center">
                  <Tooltip title='Chats'>
                    <a className="nav-Link nav-link position-relative" href="/"><ChatIcon className=" text-primary" />
                      <span className="position-absolute bg-danger text-center rounded-circle messageCountOnChatIcon">1</span>
                    </a>
                  </Tooltip>
                </li>
              </Link>
              <li className="nav-item nav-icon-Item d-flex align-items-center justify-content-center">
                <Tooltip title='Notifications'>
                  <a className="nav-Link nav-link position-relative" href="/"><NotificationsIcon className=" text-primary" />
                    <span className="position-absolute bg-danger text-center rounded-circle notifcationCountOnNotificationIcon">1</span>
                  </a>
                </Tooltip>
              </li>

              <li className="nav-item nav-icon-Item d-flex align-items-center justify-content-center me-lg-4" onClick={LogoutFunction}>
                <Tooltip title='Logout'>
                  <LogoutIcon className=" text-primary" />
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
