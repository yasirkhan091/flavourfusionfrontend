import React, { useContext, useEffect, useState } from 'react'
import './SavedRecipes.css'
import DetailedRecipe from './DetailedRecipe';
import axios from 'axios'
import Context from '../context/contextapi'

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

const FriendsCard=(props)=>{
    return (
        <>
            <div className="col-4 mx-auto position-relative">
                <img src={props.profileImagescr?props.profileImagescr:"/images/NoProfile.png"} alt="Dish" className='savedRecipeCardImage friendImageInFriendSuggestion'/>
                <p className="mx-auto text-center mb-0 friendNameInFriendSuggestion">{props.username}</p>
            </div>
        </>
    )
}

export default function SavedRecipes(props) {
    const contextData=useContext(Context);
    const [friendsArray,setFriendsArray]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
          const result= await axios.get(`/user/getFriendsSuggestion/${contextData.user.userID}`);
          setFriendsArray(result.data);
        }
        fetchData();
      },[contextData.user.userID])
    
    const savedRecipesArray=[<SavedRecipesCard/>,
    <SavedRecipesCard/>,
    <SavedRecipesCard/>,
    <SavedRecipesCard/>,
    <SavedRecipesCard/>,
    <SavedRecipesCard/>,
    <SavedRecipesCard/>,
    <SavedRecipesCard/>,
    <SavedRecipesCard/>]


  return (
    <>  

    
        <div className={props.Profile?"container savedRecipeContainer": "container savedRecipeContainer friendsContainer"}>
            <h4 className='mb-3'>{props.Profile?"Saved Recipes":"Friends Suggestions"}</h4>
            <div className="row gy-3">
                
               {props.Profile?savedRecipesArray:(friendsArray.length>0?friendsArray.map((element,index)=>{return <FriendsCard {...element} key={index}/>}): <h4 className='w-100 d-flex justify-content-center align-items-center loadingInFriendsSuggestion'>Loading Friends Suggestions....</h4>)} 
            </div>
        </div>
    </>
  )
}
