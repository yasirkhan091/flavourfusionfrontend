import './App.css';
import './components/Home';
// import Home from './components/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import ProfilePage from './components/ProfilePage';
// import RecipeSearch from './components/RecipeSearch';
// import DetailedRecipe from './components/DetailedRecipe';
function App() {
  return (
    <>
        <ProfilePage/>
    </>
  );
}

export default App;
