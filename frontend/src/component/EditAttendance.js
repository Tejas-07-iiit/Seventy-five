import axios from "axios"
import { useState } from "react"

const EditAttendance = () => {

  const [date,setdate] = useState()
  const [info,setinfo] = useState()

  const update = async () => {
    try {
      
      const response = await axios.put("http://localhost:5000/api/editatt" , {
        scode : props.scode,
        pday : props.pday,
        tday : props.tday,
        aday : tday-aday
      } , {
        withCredentials:true
      })
      if(response.ack) {
        console.log("")
      }
    } 
    catch (error) {
      console.log("Something Went Wrong : " , error.message)
    }
  }

  return (
    <>
        <div className="editDetail">
          <div className="edit">
              <form>
                  <div className="presentd">
                    <label >Total Present Day</label>
                    <input type="number"/>
                  </div>
                  <div className="totald">
                    <label >Total Day</label>
                    <input type="number" />
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
          </div>
          <div className="detail">
            <div className="lastupdate">
              <div className="date">
                {info}
              </div>
              <div className="date">
                {date}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default EditAttendance
