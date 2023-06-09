import React, { useContext, useEffect, useState } from 'react'
import "./RecipeCard.css"
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
// import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DetailedRecipe from './DetailedRecipe';
import axios from 'axios';
import Context from '../context/contextapi';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

export default function RecipeCard(props) {
    const contextData=useContext(Context);
    const [showDetailedRecipe,changeStateOfDetailedRecipe]=useState(false);
    const [recipeDetails,setRecipeDetails]=useState({});
    const [saved,setSaved]=useState(false);

    useEffect(()=>{
        setSaved(props.saved);
    },[props.saved])
    console.log(props.saved)
    const saveARecipe=async()=>{
        const result= await axios.patch(`/user/saveRecipe/${contextData.user.userID}`,{recipeId:props.id,name:props.title,imgsrc:props.image});
        if(result.status===200){
            setSaved(true);
        }else{
            alert('Error saving the recipe');
        }
        
    }

    const unsaveARecipe= async()=>{
        const result = await axios.patch(`/user/unsaveRecipe/${contextData.user.userID}`,{recipeId:props.id})
        if(result.status===200)
        {
            setSaved(false);
        }else{
            alert('Error unsaving the recipe');
        }
        
    }

    const showDetailedRecipeByIngredients=async ()=>{
        document.body.style.overflow='hidden'; 
        const result= await axios.get(`https://api.spoonacular.com/recipes/${props.id}/information/?apiKey=${process.env.REACT_APP_API_KEY}`);
        setRecipeDetails(result.data);
        changeStateOfDetailedRecipe(true);
    }

    return (
        <>
            <div className="col-md-3 col-10 mx-auto  ">  
                <div className="card recipeCard position-relative" style={{maxWidth:"18rem"}}>
                {saved?<BookmarkRemoveIcon className="position-absolute bookMarkIcon" onClick={unsaveARecipe}/>:<BookmarkAddIcon className="position-absolute bookMarkIcon" onClick={saveARecipe}/>}
                    <img src={props.image} className="card-img-top recipeImage" alt="RecipeImage" />
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <hr />
                        <div className="d-flex row">
                        {
                            //For search by ingredients card
                            props.SearchByIngredients &&
                            (<><div className="d-flex flex-column col align-items-center mb-2"><p className='mb-0'>Used Ingredients</p>{props.usedIngredientCount}</div>
                            <div className="d-flex flex-column col align-items-center mb-2"><p className='mb-0'>Missed Ingredients</p>{props.missedIngredientCount}</div>
                            </>)
                        }
                        {
                            //for search by name card
                            !props.SearchByIngredients &&
                            (<><div className="d-flex flex-column col align-items-center"><AccessTimeIcon/> {props.readyInMinutes} mins</div>
                            <div className="d-flex flex-column col align-items-center"><MenuBookIcon/>5</div>
                            <div className="d-flex flex-column col align-items-center"><PeopleIcon/>{props.servings}</div> </>)
                        }   
                        </div>
                        {!props.SearchByIngredients && <p className="card-text">{props.summary.substring(0,props.summary.indexOf('.')).replace("<b>","").replace("</b>","")}</p>}
                        <div className="mx-auto text-center">
                        <button className="btn btn-primary recipeButton mx-auto" onClick={props.SearchByIngredients?showDetailedRecipeByIngredients:()=>{document.body.style.overflow='hidden'; changeStateOfDetailedRecipe(!showDetailedRecipe)}}>Details</button>      
                        </div>
                    </div>
                </div>
            </div>

            {/* Popping up detailed Recipe */}
            {showDetailedRecipe && !props.SearchByIngredients?<DetailedRecipe {...props} offset={window.pageYOffset} removeDetailedRecipe={changeStateOfDetailedRecipe} />:""}
            {showDetailedRecipe &&  props.SearchByIngredients?<DetailedRecipe {...recipeDetails} offset={window.pageYOffset} removeDetailedRecipe={changeStateOfDetailedRecipe} />:""}
        </>
    )
}
