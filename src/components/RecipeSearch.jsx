import React, { useContext, useEffect, useRef } from 'react'
import Header from './Header'
import './RecipeSearch.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SearchInput from './SearchInput';
import RecipeCard from './RecipeCard';
import AddedIngredients from './AddedIngredients';
import { useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import axios from 'axios';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Context from '../context/contextapi';


const RecipeResults = (props) => {
  const checkSavedOrNot = (element) => {
    element.id=element.id.toString();
    console.log(element.id);
    const result = props.savedRecipeList.find(element1 => {return element1.recipeId === element.id});
    console.log(result);
    if (result)
      return true;
    else
      return false;
  }
  return (
    <div className="container recipeResultsWrapper mt-3">
      <div className="row gx-3 gy-3"  >
        {(props.recipeList && !props.SearchByIngredients) && props.recipeList.map((element) => { return <RecipeCard key={element.id} saved={checkSavedOrNot(element)} {...element} /> })}
        {(props.recipeList && props.SearchByIngredients) && props.recipeList.map((element) => { return <RecipeCard key={element.id} saved={checkSavedOrNot(element)} {...element} SearchByIngredients /> })}
      </div>
    </div>
  )
}



export default function RecipeSearch() {

  //All states Used
  const contextData = useContext(Context);
  const [key, setKey] = useState('name');
  const [recipeList, setRecipeList] = useState([]);
  const [recipeListOfIngredients, setRecipeListOfIngredients] = useState([]);
  const recipeName = useRef();
  const ingredientName = useRef();
  const [offset, setOffset] = useState(0);
  const offsetInIngredients = useRef(0);
  const [ingredients, setIngredients] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [savedRecipeList, setSavedRecipeList] = useState([]);

  //Fetching Saved Recipes

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/user/getSavedRecipes/${contextData.user.userID}`);
      setSavedRecipeList(result.data);
    }
    fetchData();
  }, [contextData.user.userID])


  //functions to load next or previous page for recipe Search
  const nextPage =(type) => {
    if (type === "name" && totalRecipes - offset > 8) {
      console.log(offset);
      setOffset(offset + 8);
      console.log(offset);
      searchRecipeByName();
    }

    if (type === "ingredients" && (recipeListOfIngredients.length === 8)) {
      offsetInIngredients.current=offsetInIngredients.current+8;
      searchByIngredients();
    }
  }
  const previousPage = (type) => {
    if (type === "name" && offset >= 8) {
      setOffset(offset - 8);
      searchRecipeByName();
    }

    if (type === "ingredients" && (offsetInIngredients.current >= 8)) {
      offsetInIngredients.current=offsetInIngredients.current-8;
      searchByIngredients();
    }
  }

  //Fecthing Recipes from Spoonacular api 

  const searchRecipeByName = async () => {
    const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${recipeName.current.value}&addRecipeInformation=true&number=8&offset=${offset}`);
    if (result.data && result.data.results.length > 0) {
      setRecipeList(result.data.results);
      setTotalRecipes(result.data.totalResults);
    }
    else
      alert("No recipe found for the given query");
  }

  //Functions for adding and deleting ingredients for recipe search
  const addIngredient = () => {
    setIngredients([...ingredients, ingredientName.current.value]);
    ingredientName.current.value = "";
  }
  const deleteIngredients = (name) => {
    setIngredients(ingredients.filter((e) => { return (e !== name) }));
  }

  //Fetching recipes based on ingredient from spoonacular api
  const searchByIngredients = async () => {
    console.log(offsetInIngredients.current + " IngredientsOffset")
    if (ingredients.length === 0)
      alert("Please Add Ingredients first");
    else {
      const ingredientsList = ingredients.join(',+');
      const result = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${ingredientsList}&number=8&sort=min-missing-ingredients&offset=${offsetInIngredients.current}`);
      console.log(result.data);
      setRecipeListOfIngredients(result.data);
    }
  }

  return (
    <>
      <Header />
      <div className="contents height">
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 mt-3 w-25 mx-auto"
          fill
        >
          <Tab eventKey="name" title="Name " className='text-center'>

            <SearchInput placeholder="Enter name of a Recipe..." buttonName="Search" input={recipeName} searchFunction={searchRecipeByName} setOffset={setOffset} />

            <div className="d-flex align-items-center justify-content-center w-100 mt-2">
              {offset >= 8 && <div className="d-flex align-items-center justify-content-center me-3 cursor-pointer" onClick={() => { previousPage("name") }}><ChevronLeftIcon style={{ width: "35px", height: "35px" }} /> <span>prev</span></div>}
              {totalRecipes - offset > 8 && <div className="d-flex align-items-center justify-content-center ms-3 me-4 cursor-pointer" onClick={() => { nextPage("name") }}><span>next</span><NavigateNextOutlinedIcon style={{ width: "35px", height: "35px" }} /> </div>}
            </div>

            <RecipeResults recipeList={recipeList} savedRecipeList={savedRecipeList} />
          </Tab>
          <Tab eventKey="ingredients" title="Ingredients" className='text-center'>
            <SearchInput placeholder="Enter name of the Ingredient..." input={ingredientName} buttonName="Add" searchFunction={addIngredient} />

            {/* Add Ingredients Box  */}
            <div className="ingredientInputListWrapper mx-auto mt-3 p-4">
              <h4 className=' text-start fs-5 d-flex align-items-center'><DinnerDiningIcon className='me-2' />Ingredients Selected</h4>
              <p className='fs-6 text-start'>Please add or delete ingredients from this list</p>
              <div className="listOfAddedIngredients d-flex mb-3 rounded">
                {ingredients.length > 0 ? ingredients.map(element => { return <AddedIngredients name={element} deleteFunction={deleteIngredients} /> }) : <AddedIngredients name="No Ingredient Added" Empty />}
              </div>
              <div className="bottomOfAddedIngredients d-flex align-items-center justify-content-between ">
                <span>{ingredients.length} ingredients selected</span> <button className='btn  btn-primary' onClick={() => { offsetInIngredients.current=0; searchByIngredients() }}>Search</button>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center w-100 mt-2">
              {offsetInIngredients.current >= 8 && <div className="d-flex align-items-center justify-content-center me-3 cursor-pointer" onClick={() => { previousPage("ingredients") }}><ChevronLeftIcon style={{ width: "35px", height: "35px" }} /> <span>prev</span></div>}
              {recipeListOfIngredients.length === 8 && <div className="d-flex align-items-center justify-content-center ms-3 me-4 cursor-pointer" onClick={() => { nextPage("ingredients") }}><span>next</span><NavigateNextOutlinedIcon style={{ width: "35px", height: "35px" }} /> </div>}
            </div>

            <RecipeResults recipeList={recipeListOfIngredients} savedRecipeList={savedRecipeList} SearchByIngredients />

          </Tab>
          {/* <Tab eventKey="longer-tab" title="Nutrients" className='text-center'>
            <SearchInput placeholder="Enter nutrient with min or max as their prefix.eg.minCarb" buttonName="Add" />
          </Tab> */}

        </Tabs>
      </div>
    </>
  )
}
