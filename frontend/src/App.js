import './App.css';
import './Main.css';
import Register from './component/Register';
import axios from 'axios';
import { useEffect } from 'react';
import Home from "./component/Home"
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import  {login}  from "./Redux_store/Auth";
import Side_pannel from './component/Side_pannel';
import Subject from './component/Subject';
import Attendance from './component/Attendance';
import Main from './component/Main';
import Login from './component/Login';

function App() {
    const dispatch = useDispatch();
      
    const comp = useSelector((state)=>state.comp.comp)
    let auth = useSelector((state)=>state.auth.isAuth)
    
    useEffect(()=>{
      // check tocken
      const Refresh = async () => {
        
        try { 
          const response = await axios.post("http://localhost:5000/api/refresh",{},
            {
              withCredentials : true
            }
          )
          if(response.status === 200) {
            dispatch(login(response.data.dc))  
          }
        }
        catch (error) {
            console.log(error.message)
        }
      }      
      Refresh();

    },[auth])
    
    return (
      <>
        {auth ?  <Home/> : <Register/>}
        {!auth &&   <Main/>}
        {comp === "signin" && <Login/>}
        <div className="mainbody">
         {auth && 
            <Side_pannel/> }
          {auth && <Subject/> }
          {auth && <Attendance/>}
        </div>
      </>
  );
}

export default App;
