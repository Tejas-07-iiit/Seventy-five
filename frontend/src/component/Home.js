import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser  } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import axios from "axios"
import { useDispatch } from 'react-redux';
import {login} from "../Redux_store/Auth"
import { comp } from '../Redux_store/Comp';

const Home = () => {
  
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/logout" , {} , {
        withCredentials:true
      })

      const pld = {user : {} , at : false}

      dispatch(login(pld))
      dispatch(comp("homePage"))
      console.log(response)
    } catch (error) {
      console.log("something went wrong : " , error.message)
    }
  }

  return (
    <>
      <div className="navbar">
          <div className="heading">
            EduTrack
          </div>
          <div className="menu">

              <div className="item">
                <a href="/">About</a>
              </div>
              <div className="item">
                <a href="/">Contact</a>
              </div>

              <div className="profile">
                <div className="icon">
                  <FontAwesomeIcon style={{color:"white", fontSize:"25px"}} icon={faCircleUser} />
                </div>
                <div className="profilemenu">
                  <div className="pitem">
                    <FontAwesomeIcon style={{color:"black", fontSize:"18px"}} icon={faCircleUser} />
                    <button onClick={()=>dispatch(comp("profile"))}>
                      Profile
                    </button>
                  </div>
                  <div className="pitem">
                    <FontAwesomeIcon style={{alignItems:"center" , paddingTop:"3px" , fontSize:"18px" , color:"black"}} icon={faRightFromBracket} />
                    <button onClick={logout}>
                      Log Out
                    </button>
                  </div>
                </div>
              </div>

          </div>
      </div>
    </>
  )
}

export default Home