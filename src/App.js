import './App.css';
import './components/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { initialState, reducer } from "./context/Reducer";
import { useEffect, useReducer } from 'react';
import Context from "./context/contextapi";
import Home from './components/Home';
import ProfilePage from './components/ProfilePage';
import RecipeSearch from './components/RecipeSearch';
import Login from './components/Login';
import Loading from './components/Loading';
import { ChatPage } from './components/ChatPage';
import { io } from 'socket.io-client';
const socket = io('http://192.168.1.55:5000',{
  transports: ['websocket'],
  reconnection: true,
  rejectUnauthorized: false
});
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function App() {
  const [user, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    const login=async () => {
    const tokenValue = await axios.get("/auth/whoami");
    if(!(tokenValue.data==="Not Logged In"))
      {
        const payload = {
          userID: tokenValue.data.userID,
          LoggedIn: true
        }
        await dispatch({ type: "LogIn", payload });
        socket.emit('join',tokenValue.data.userID);
      }
      else
      {
        await dispatch({type:"LogInFailed"});
      }
  }
  login();
},[]);
  
  return (
    <>
      <Context.Provider value={{ user, dispatch }}>
        <BrowserRouter>
          <Routes>
            {user.LoggedIn && <>
              <Route path='/' element={<Home />} />
              <Route path='/profile/:id' element={<ProfilePage />} />
              <Route path='/recipeSearch' element={<RecipeSearch />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Login signup />} />
              <Route path='/chat' element={<ChatPage socket={socket}/>}/>
            </>}

            {(!user.LoggedIn&&!user.LoggingIn) && <>
              <Route path='*' element={<Login />} />
              <Route path='/signup' element={<Login signup />} />
            </>}
            {
              (!user.LoggedIn&&user.LoggingIn) && <>
                <Route path="*" element={<Loading/>}/>
              </>
            }
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
