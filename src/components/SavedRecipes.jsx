import React, { useState } from 'react'
import './SavedRecipes.css'
import DetailedRecipe from './DetailedRecipe';

const SavedRecipesCard=()=>{
    const [showDetailedRecipe,changeStateOfDetailedRecipe]=useState(false);
    return (
        <>
            <div className="col-4 mx-auto position-relative">
                <img src="/images/Dish2.jpg" alt="Dish" className='savedRecipeCardImage'/>
                <span className='position-absolute top-0 savedRecipeNameBackground ps-2' onClick={()=>{document.body.style.overflow='hidden'; changeStateOfDetailedRecipe(!showDetailedRecipe)}}></span>
                <span className='position-absolute top-0 savedRecipeName' onClick={()=>{document.body.style.overflow='hidden'; changeStateOfDetailedRecipe(!showDetailedRecipe)}}>Dish Name</span>
            </div>
            {showDetailedRecipe?<DetailedRecipe offset={window.pageYOffset} removeDetailedRecipe={changeStateOfDetailedRecipe} />:""}
        </>
    )
}

export default function SavedRecipes() {
  return (
    <>  

    
        <div className="container savedRecipeContainer">
            <h4 className='mb-3'>Saved Recipes</h4>
            <div className="row gy-3">
                
                <SavedRecipesCard/>
                <SavedRecipesCard/>
                <SavedRecipesCard/>
                <SavedRecipesCard/>
                <SavedRecipesCard/>
                <SavedRecipesCard/>
                <SavedRecipesCard/>
                <SavedRecipesCard/>
                <SavedRecipesCard/>
            </div>
        </div>
    </>
  )
}
