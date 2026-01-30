import './App.css';
import Register from './component/Register';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import Home from "./component/Home"
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import  {login}  from "./Redux_store/Auth";

function App() {
    const dispatch = useDispatch();

    const auth = useSelector((state)=>state.auth.isAuth)
    const initial = 0;
    useEffect(()=>{
      // check tocken
      const Refresh = async () => {
        
        try {
          const response = await axios.post("http://localhost:5000/refresh",{},
            {
              withCredentials : true
            }
          )
          if(response.status === 200) {
            dispatch(login(response.data.dc))  
          }
        }
        catch (error) {
          // if(initial !== 0){
            console.log(error.message)
          // } 
          // initial += 1;
        }
      }      
      Refresh();
      
    },[auth])
    
    return (
      <>
        {auth ? <Home/> : <Register/>}
      </>
  );
}

export default App;
