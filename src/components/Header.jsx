import React from 'react'
import ChecklistIcon from '@mui/icons-material/Checklist';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light Navbar">
        <div className="container-fluid">
          <a className="navbar-brand ms-5" href="/">FlavourFusion</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/"><SearchIcon />Recipe Search</a>
              </li>

              <li className="nav-item">
                <Tooltip title='Saved Recipes'>
                  <a className="nav-link" href="/"> <ChecklistIcon /> </a>
                </Tooltip>
              </li>
              <li className="nav-item ">
                <Tooltip title='Chats'>
                  <a className="nav-link position-relative" href="/"><ChatIcon />
                  <span className="position-absolute bg-danger text-center rounded-circle messageCountOnChatIcon">1</span>
                  </a>
                </Tooltip>
              </li>

              <li className="nav-item">
                <Tooltip title='Notifications'>
                  <a className="nav-link position-relative" href="/"><NotificationsIcon />
                  <span className="position-absolute bg-danger text-center rounded-circle notifcationCountOnNotificationIcon">1</span>
                  </a>
                </Tooltip>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Shopping List</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
