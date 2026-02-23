import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser  } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {

  const [image,setimage] = useState(null)
  const comp = useSelector((state)=>state.comp.comp)

  const upload = async () => { 
    // console.log(image)
    try {

      const formdata = new FormData()
      formdata.append("profile",image)
      const response = await axios.post("http://localhost:5000/api/profile-picture",
        formdata,
      {
        withCredentials:true
      })
      // console.log(formdata)
      
    } catch (error) {
      console.log("Something went wrong : " , error.message)
    }
  }
  
  return (
    <>
    {comp === "profile" &&
      <div className="profilepage">
        <div className="profileimage">
          <button onClick={upload}><FontAwesomeIcon className='pic' icon={faCircleUser} /></button>
          <input type="file" onChange={(e)=>setimage(e.target.files[0])} />
        </div>
        <div className="profiledetail">
          detail
        </div>
      </div>
      }
    </>
  )
}

export default Profile