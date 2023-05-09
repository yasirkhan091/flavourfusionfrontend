import './App.css';
import './components/Home';
// import Home from './components/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import RecipeSearch from './components/RecipeSearch';
// import DetailedRecipe from './components/DetailedRecipe';
function App() {
  return (
    <>
      {/* <Home/> */}
      <RecipeSearch/>
    </>
  );
}

export default App;
