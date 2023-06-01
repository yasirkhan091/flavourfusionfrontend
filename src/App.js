import './App.css';
import './components/Home';
import Home from './components/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import ProfilePage from './components/ProfilePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeSearch from './components/RecipeSearch';
import Login from './components/Login';
function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/recipeSearch' element={<RecipeSearch/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Login signup/>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
