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
        
        <div className="sideOptionsWrapper box-shadow mx-auto">
            <h4 className='mb-2'>Recipe Options</h4>
            <div className="sideOptionsBox">
            <Link to='/recipeSearch' className='text-decoration-none text-dark'>
                <SearchIcon  style={{color:"#4ff57b"}} className='fs-3 sideOptionsIcons'/>Recipe Search
            </Link>
            </div>
            {/* <hr className='w-100 mt-2 mb-2'/> */}
            <div className="sideOptionsBox">
                <FormatListBulletedIcon  style={{color:"#f8de00"}} className='fs-3 sideOptionsIcons '/>Saved Recipes
            </div>
            {/* <hr className='w-100 mt-2 mb-2'/> */}
            <div className="sideOptionsBox">
                <ChecklistIcon  style={{color:"#8abaff"}} className='fs-3 sideOptionsIcons '/>Shopping List
            </div>
            {/* <hr className='w-100 mt-2 mb-2'/> */}
            <div className="sideOptionsBox">
                <DownloadIcon style={{color:"#e97efd"}} className='fs-3 sideOptionsIcons '/>Download List
            </div>
        </div>
    </>
  )
}
