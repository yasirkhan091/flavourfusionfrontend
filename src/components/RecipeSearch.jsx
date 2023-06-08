import React, { useRef } from 'react'
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


const RecipeResults = (props) => {
  console.log(props.recipeList);
  return (
    <div className="container recipeResultsWrapper mt-3">
      <div className="row gx-3 gy-3"  >
        {(props.recipeList && !props.SearchByIngredients) && props.recipeList.map((element) => { return <RecipeCard key={element.id} {...element} /> })}
        {(props.recipeList && props.SearchByIngredients) && props.recipeList.map((element) => { return <RecipeCard key={element.id} {...element} SearchByIngredients /> })}
      </div>
    </div>
  )
}



export default function RecipeSearch() {
  const [key, setKey] = useState('name');
  const [recipeList, setRecipeList] = useState([]);
  const [recipeListOfIngredients, setRecipeListOfIngredients] = useState([]);
  const recipeName = useRef();
  const ingredientName = useRef();
  const [offset, setOffset] = useState(0);
  // const [offsetInIngredients,setOffsetInIngredients]=useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);

  const nextPage = () => {
    if (totalRecipes - offset > 8)
    {
      console.log(offset);
      setOffset(offset + 8);
      console.log(offset);
      searchRecipeByName();
    }
  }
  const previousPage = () => {
    if (offset >= 8)
      setOffset(offset - 8);
      searchRecipeByName();
  }

  const searchRecipeByName = async () => {
    const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${recipeName.current.value}&addRecipeInformation=true&number=8&offset=${offset}`);
    if (result.data && result.data.results.length > 0) {
      setRecipeList(result.data.results);
      setTotalRecipes(result.data.totalResults);
    }
    else
      alert("No recipe found for the given query");
  }
  const addIngredient = () => {
    setIngredients([...ingredients, ingredientName.current.value]);
    ingredientName.current.value = "";
  }
  const deleteIngredients = (name) => {
    setIngredients(ingredients.filter((e) => { return (e !== name) }));
  }
  const searchByIngredients = async () => {
    if (ingredients.length === 0)
      alert("Please Add Ingredients first");
    else {
      const ingredientsList = ingredients.join(',+');
      const result = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${ingredientsList}&number=8&sort=min-missing-ingredients`);
      setRecipeListOfIngredients(result.data);
    }
  }

  console.log(totalRecipes);
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

            <SearchInput placeholder="Enter name of a Recipe..." buttonName="Search" input={recipeName} searchFunction={searchRecipeByName} setOffset={setOffset}/>
      
            <div className="d-flex align-items-center justify-content-center w-100 mt-2">
             {offset>=8 && <div className="d-flex align-items-center justify-content-center me-3 cursor-pointer" onClick={previousPage}><ChevronLeftIcon style={{ width: "35px", height: "35px" }} /> <span>prev</span></div>} 
             {totalRecipes-offset>8 && <div className="d-flex align-items-center justify-content-center ms-3 me-4 cursor-pointer" onClick={nextPage}><span>next</span><NavigateNextOutlinedIcon style={{ width: "35px", height: "35px" }} /> </div>} 
            </div>
            
            <RecipeResults recipeList={recipeList} />
          </Tab>
          <Tab eventKey="ingredients" title="Ingredients" className='text-center'>
            <SearchInput placeholder="Enter name of the Ingredient..." input={ingredientName} buttonName="Add" searchFunction={addIngredient} />
            <div className="ingredientInputListWrapper mx-auto mt-3 p-4">
              <h4 className=' text-start fs-5 d-flex align-items-center'><DinnerDiningIcon className='me-2' />Ingredients Selected</h4>
              <p className='fs-6 text-start'>Please add or delete ingredients from this list</p>
              <div className="listOfAddedIngredients d-flex mb-3 rounded">
                {ingredients.length > 0 ? ingredients.map(element => { return <AddedIngredients name={element} deleteFunction={deleteIngredients} /> }) : <AddedIngredients name="No Ingredient Added" Empty />}
              </div>
              <div className="bottomOfAddedIngredients d-flex align-items-center justify-content-between ">
                <span>{ingredients.length} ingredients selected</span> <button className='btn  btn-primary' onClick={searchByIngredients}>Search</button>
              </div>
            </div>
            <RecipeResults recipeList={recipeListOfIngredients} SearchByIngredients />

          </Tab>
          {/* <Tab eventKey="longer-tab" title="Nutrients" className='text-center'>
            <SearchInput placeholder="Enter nutrient with min or max as their prefix.eg.minCarb" buttonName="Add" />
          </Tab> */}

        </Tabs>
      </div>
    </>
  )
}
