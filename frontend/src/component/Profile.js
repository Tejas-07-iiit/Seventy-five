import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {

  const [image, setimage] = useState(null)
  const comp = useSelector((state) => state.comp.comp)
  const user = useSelector((state) => state.auth.user) || 0
  const [path, setpath] = useState(null)
  const [imageError, setImageError] = useState(false);
  const [fname , setfname] = useState()
  const [mail, setmail] = useState()
  // fetch profile detail 
 
    const dt = async () => {
      try {
        
        if(user !== 0) {
          const response = await axios.post("http://localhost:5000/api/prrofile" , {} , {
            withCredentials:true
          })
    
          setfname(response.data.f_name + " " + response.data.l_name)
          setmail(response.data.email)
          // console.log(response.data , "i am data")
          }
      } catch (error) {
        console.log("something went wrong : " , error.message)
      }
    }
      dt()
  

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

  useEffect(() => {
    if (user && user.userId) {
      setpath(`http://localhost:5000/uploads/${user.userId}.webp?v=${Date.now()}`)
      setImageError(false);
    }
  }, [user])

  return (
    <>
      {comp === "profile" &&
        <div className="profilepage">

          <div className="profileimage">
              {path && !imageError ? (
                <img src={path} onError={() => setImageError(true)} alt="profile" />
              ) : (
                <FontAwesomeIcon icon={faCircleUser} />
              )}
            <input style={{display:'none'}} type="file" id='chsfile' onChange={(e) => { setImageError(false); setimage(e.target.files[0]); }} />
            <label for="chsfile" className='fileibtn'>Choose File</label>
          </div>

          <div className="profiledetail">
            <div className="fullname">
              <p>Name</p> 
              <input type='textarea' defaultValue={fname} readOnly></input>
            </div>
            <div className="premail">
              <p>Email</p> 
              <input type='textarea' defaultValue={mail} readOnly></input>
            </div>
          </div>

        </div>
      }
    </>
  )
}

export default Profile  