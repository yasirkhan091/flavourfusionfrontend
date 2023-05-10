import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from 'react-router-dom';
import './SideOptions.css'
export default function SideOptions() {
  return (
    <>
        <div className="sideOptionsWrapper mx-auto">
            <div className="sideOptionsBox">
            <Link to='/recipeSearch' className='text-decoration-none text-dark '>
                <SearchIcon className='me-2 fs-2'/>Recipe Search
            </Link>
            </div>
            <hr className='w-100'/>
            <div className="sideOptionsBox">
                <FormatListBulletedIcon className='me-2 fs-2'/>Shopping List
            </div>
        </div>
    </>
  )
}
