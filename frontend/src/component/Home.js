import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser  } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState , useEffect } from 'react';
import axios from "axios"
import { useDispatch } from 'react-redux';
import {login} from "../Redux_store/Auth"
import { comp } from '../Redux_store/Comp';

const Home = () => {
  
  const user = useSelector((state) => state.auth.user) || 0
  const [path, setpath] = useState(null)
  const [imageError, setImageError] = useState(false);
  const image = useSelector((state)=> state.image1.image1)

  const dispatch = useDispatch()
    useEffect(() => {
    if (!image) return;

    const upload = async () => {
      try {
        const formdata = new FormData();
        formdata.append("profile", image);

        const response = await axios.post(
          "http://localhost:5000/api/profile-picture",
          formdata,
          { withCredentials: true }
        );

        setpath(
          `http://localhost:5000${response.data.image}?v=${Date.now()}`
        );
        setImageError(false);
      } catch (error) {
        console.error("Upload failed", error);
      }
    };

    upload();
  }, [image]);
  
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

  useEffect(() => {
      if (user && user.userId) {
        setpath(`http://localhost:5000/uploads/${user.userId}.webp?v=${Date.now()}`)
        setImageError(false);
      }
    }, [user])
    
  return (
    <>
      <div className="navbar">
          <div className="heading">
            EduTrack
          </div>
          <div className="menu">

              <div className="item">
                <a to="/">About</a>
              </div>
              <div className="item">
                <a to="/">Contact</a>
              </div>

              <div className="profile">
                <div className="icon">
                  {path && !imageError ? (
                <img src={path} onError={() => setImageError(true)} alt="profile" />
              ) : (
                <FontAwesomeIcon style={{color:"white", fontSize:"25px"}} icon={faCircleUser} />
              )}
                </div>
                <div className="profilemenu">
                  <div className="pitem">
                    {<FontAwesomeIcon style={{color:"black", fontSize:"18px"}} icon={faCircleUser} />}
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