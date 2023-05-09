import React from 'react'
import Header from './Header'
import './RecipeSearch.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SearchInput from './SearchInput';
import RecipeCard from './RecipeCard';
import AddedIngredients from './AddedIngredients';
// import SearchIcon from '@mui/icons-material/Search';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
export default function RecipeSearch() {
  return (
    <>
      <Header />
      <div className="contents height">
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3 mt-3 w-25 mx-auto"
          fill
        >
          <Tab eventKey="home" title="Name " className='text-center'>
            <SearchInput placeholder="Enter name of a Recipe..." buttonName="Search" />
          </Tab>
          <Tab eventKey="profile" title="Ingredients" className='text-center'>
            <SearchInput placeholder="Enter name of the Ingredient..." buttonName="Add" />
            <div className="ingredientInputListWrapper bg-light mx-auto mt-3 p-4">
              <h4 className=' text-start fs-5 d-flex align-items-center'><DinnerDiningIcon className='me-2'/>Ingredients Selected</h4>
              <p className='fs-6 text-start'>Please add or delete ingredients from this list</p>
              <div className="listOfAddedIngredients d-flex mb-3 rounded">
                <AddedIngredients name="sugar"/>
                <AddedIngredients name="milk"/>
                <AddedIngredients name="banana"/>
              </div>
              <div className="bottomOfAddedIngredients d-flex align-items-center justify-content-between ">
                <span>3 ingredients selected</span> <button className='btn  btn-primary'>Search</button>
              </div>
            </div>
          </Tab>
          {/* <Tab eventKey="longer-tab" title="Nutrients" className='text-center'>
            <SearchInput placeholder="Enter nutrient with min or max as their prefix.eg.minCarb" buttonName="Add" />
          </Tab> */}

        </Tabs>
        <div className="container recipeResultsWrapper mt-3">
          <div className="row gx-3 gy-3"  >
          
            <RecipeCard src="/images/Dish1.png"/>
            <RecipeCard src="/images/Dish2.png"/>
            <RecipeCard src="/images/Dish3.png"/>
            <RecipeCard src="/images/Dish1.png"/>
            <RecipeCard src="/images/Dish2.png"/>
            <RecipeCard src="/images/Dish3.png"/>
            <RecipeCard src="/images/Dish3.png"/>
            <RecipeCard src="/images/Dish3.png"/>
          </div>
        </div>
       

      </div>
    </>
  )
}
