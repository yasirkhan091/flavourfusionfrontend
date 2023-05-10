import React from 'react'
import ChecklistIcon from '@mui/icons-material/Checklist';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
// import FastfoodIcon from '@mui/icons-material/Fastfood';
import './Header.css';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light Navbar">
        <div className="container-fluid">
          <Link className="navbar-brand ms-5 fw-bold " to="/"><span className='text-primary'>Flavour</span>Fusion</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-item-center ">
              <li className="nav-item nav-Item recipeSearchLink">
                <Link className="nav-Link nav-link recipeSearchText " aria-current="page" to="/recipeSearch"><SearchIcon />Recipe Search</Link>
              </li>
              <li className="nav-item nav-Item">
                <a className="nav-Link nav-link" href="/">Shopping List</a>
              </li>
              <li className="nav-item nav-Item">
                <Tooltip title='Saved Recipes'>
                  <a className="nav-Link nav-link" href="/"> <ChecklistIcon /> </a>
                </Tooltip>
              </li>
              <li className="nav-item nav-Item ">
                <Tooltip title='Chats'>
                  <a className="nav-Link nav-link position-relative" href="/"><ChatIcon />
                  <span className="position-absolute bg-danger text-center rounded-circle messageCountOnChatIcon">1</span>
                  </a>
                </Tooltip>
              </li>

              <li className="nav-item nav-Item">
                <Tooltip title='Notifications'>
                  <a className="nav-Link nav-link position-relative" href="/"><NotificationsIcon />
                  <span className="position-absolute bg-danger text-center rounded-circle notifcationCountOnNotificationIcon">1</span>
                  </a>
                </Tooltip>
              </li>
              
              <li className="nav-item nav-Item">
                <a className="nav-Link nav-link" href="/">Logout <LogoutIcon/></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
