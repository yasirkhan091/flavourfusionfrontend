import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import './SideOptions.css'
export default function SideOptions() {
  return (
    <>
        
        <div className="sideOptionsWrapper mx-auto">
            <h4 className='mb-2'>Recipe Options</h4>
            <div className="sideOptionsBox ">
            <Link to='/recipeSearch' className='text-decoration-none text-dark'>
                <SearchIcon className='me-2 fs-3'/>Recipe Search
            </Link>
            </div>
            <hr className='w-100 mt-2 mb-2'/>
            <div className="sideOptionsBox">
                <FormatListBulletedIcon className='me-2 fs-3 '/>Saved Recipes
            </div>
            <hr className='w-100 mt-2 mb-2'/>
            <div className="sideOptionsBox">
                <ChecklistIcon className='me-2 fs-3 '/>Shopping List
            </div>
            <hr className='w-100 mt-2 mb-2'/>
            <div className="sideOptionsBox">
                <DownloadIcon className='me-2 fs-3 '/>Download List
            </div>
        </div>
    </>
  )
}
