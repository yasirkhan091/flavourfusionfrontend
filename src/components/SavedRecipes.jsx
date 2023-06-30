import React, { useContext, useEffect, useRef, useState } from 'react'
import './SavedRecipes.css'
import DetailedRecipe from './DetailedRecipe';
import axios from 'axios'
import Context from '../context/contextapi'
import { Link, useParams } from 'react-router-dom';

const SavedRecipesCard = (props) => {
    const [showDetailedRecipe, changeStateOfDetailedRecipe] = useState(false);
    const recipeData = useRef();
    const fetchDataAndShowDetailedRecipe = async () => {
        const result = await axios.get(`https://api.spoonacular.com/recipes/${props.recipeId}/information/?apiKey=${process.env.REACT_APP_API_KEY}`);
        recipeData.current = result.data;
        document.body.style.overflow = 'hidden';
        changeStateOfDetailedRecipe(!showDetailedRecipe);
    }
    return (
        <>
            <div className="col-4 mx-auto position-relative">
                <img src={props.imgsrc ? props.imgsrc : "/images/NoSavedRecipe.JPG"} alt="Dish" className='savedRecipeCardImage' />
                <span className='position-absolute top-0 savedRecipeNameBackground ps-2' onClick={!props.Empty ? fetchDataAndShowDetailedRecipe : () => { }}></span>
                <span className='position-absolute top-0 savedRecipeName' onClick={!props.Empty ? fetchDataAndShowDetailedRecipe : () => { }}>{props.name ? props.name : "Dish Name"}</span>
            </div>
            {!props.Empty && (showDetailedRecipe ? <DetailedRecipe {...recipeData.current} offset={window.pageYOffset} removeDetailedRecipe={changeStateOfDetailedRecipe} /> : "")}
        </>
    )
}

const FriendsCard = (props) => {
    return (
        <>

            <div className="col-4 mx-auto position-relative">
                <Link to={`/profile/${props._id}`}>
                    <img src={props.profileImagescr ? props.profileImagescr : "/images/NoProfile.png"} alt="Dish" className='savedRecipeCardImage friendImageInFriendSuggestion' />
                </Link>
                <Link to={`/profile/${props._id}`} style={{ textDecoration: 'none' }}>
                    <p className="mx-auto text-center mb-0 friendNameInFriendSuggestion">{props.username}</p>
                </Link>
            </div>

        </>
    )
}

export default function SavedRecipes(props) {
    const contextData = useContext(Context);
    const [friendsArray, setFriendsArray] = useState([]);
    const [savedRecipesArray, setSavedRecipesArray] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/user/getFriendsSuggestion/${contextData.user.userID}`);
            setFriendsArray(result.data);
        }
        const fetchSavedRecipeData = async () => {
            const result = await axios.get(`/user/getSavedRecipes/${id}`);
            if (result.data.length < 9) {
                if (result.data.length === 0)
                    setSavedRecipesArray(Array(9 - result.data.length).fill("Empty"));
                else
                    setSavedRecipesArray([...result.data, ...Array(9 - result.data.length).fill("Empty")])

            }
            else
                setSavedRecipesArray([...result.data, ...Array(3 - (result.data.length % 3)).fill("Empty")])
        }
        props.Profile ? fetchSavedRecipeData() : fetchData();
    }, [contextData.user.userID, props.Profile, id])

    const convertToSavedRecipeCard = (element) => {
        if (element === "Empty")
            return <SavedRecipesCard Empty />
        else
            return <SavedRecipesCard {...element} />
    }

    return (
        <>
            <div className={props.Profile ? "container oox-shadow savedRecipeContainer" : "container box-shadow savedRecipeContainer friendsContainer"}>
                <h4 className='mb-3'>{props.Profile ? "Saved Recipes" : "Friends Suggestions"}</h4>
                <div className="row gy-3 ">

                    {props.Profile ? (savedRecipesArray.length > 0 ? savedRecipesArray.map(convertToSavedRecipeCard) : <h4 className='w-100 d-flex justify-content-center align-items-center loadingInFriendsSuggestion'>Loading Saved Recipes....</h4>) : (friendsArray.length > 0 ? friendsArray.map((element, index) => { return <FriendsCard {...element} key={index} /> }) : <h4 className='w-100 d-flex justify-content-center align-items-center loadingInFriendsSuggestion'>Loading Friends Suggestions....</h4>)}
                </div>
            </div>
        </>
    )
}
