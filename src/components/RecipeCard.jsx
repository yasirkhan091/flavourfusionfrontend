import React, { useState } from 'react'
import "./RecipeCard.css"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
// import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DetailedRecipe from './DetailedRecipe';
export default function RecipeCard(props) {
    const [showDetailedRecipe,changeStateOfDetailedRecipe]=useState(false);
    return (
        <>
            <div className="col-md-3 col-10 mx-auto  ">  
                <div className="card recipeCard position-relative" style={{maxWidth:"18rem"}}>
                <BookmarkAddIcon className="position-absolute bookMarkIcon"/>
                    <img src={props.src} className="card-img-top recipeImage" alt="RecipeImage" />
                    <div className="card-body">
                        <h5 className="card-title">Dish Name</h5>
                        <hr />
                        <div className="d-flex row">
                            <div className="d-flex flex-column col align-items-center"><AccessTimeIcon/> 20 mins</div>
                            <div className="d-flex flex-column col align-items-center"><MenuBookIcon/>5</div>
                            <div className="d-flex flex-column col align-items-center"><PeopleIcon/>4</div>
                        </div>
                        <p className="card-text">It is a very tasty and mouth watering dish. You will lick your fingers once you eat it.</p>
                        <div className="mx-auto text-center">
                        <button className="btn btn-primary recipeButton mx-auto" onClick={()=>{document.body.style.overflow='hidden'; changeStateOfDetailedRecipe(!showDetailedRecipe)}}>Details</button>      
                        </div>
                    </div>
                </div>
            </div>
            {showDetailedRecipe?<DetailedRecipe offset={window.pageYOffset} removeDetailedRecipe={changeStateOfDetailedRecipe} />:""}
        </>
    )
}
