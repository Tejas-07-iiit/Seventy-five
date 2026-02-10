import axios, { all } from "axios"
import { useDispatch } from "react-redux"
import { setEdit } from "../Redux_store/Attedit"
import { useState } from "react"
import Alert from "./Alert"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const EditAttendance = (props) => {
  const dispatch = useDispatch()
  const [date,setdate] = useState("date")
  const [info,setinfo] = useState("info")
  const [scode,setcode] = useState(props.content.scode)
  const [preday , setpreday] = useState(props.content.pday)
  const [today , setday] = useState(props.content.tday)
  const [alt , setalert] = useState(false)

  const update = async (e) => {
    e.preventDefault()

    console.log(preday > today , preday , today)
    if((parseInt(preday) > parseInt(today)) || (parseInt(preday)<0) || (parseInt(today)<0)) {
      setalert(true);
      setTimeout(() => {
        setalert(false)
      }, 1500);
      return;
    }
    else {
      setalert(false);
    }

    const aday = today - preday;
    try {
      const response = await axios.put("http://localhost:5000/api/editatt" , {
        scode : scode,
        pday : preday,
        tday : today,
        aday : aday
      } , {
        withCredentials:true
      })
      if(response.ack) {
        console.log("sdkfn")
      }
    } 
    catch (error) {
      console.log("Something Went Wrong : " , error.message)
    }
    dispatch(setEdit(-1))
    
    setday(props.content.tday)
    setpreday(props.content.pday)
  } 

  return (
    <>
        <div className="editDetail">
          <div className="edit">
              <form>
                {alt && <Alert message={"Please Enter Valid Value!"} />}
                  <div className="presentd">
                    <label>Total Present Day</label>
                    <input onChange={(e)=>setpreday(e.target.value)} defaultValue={props.content.pday} type="number"/>
                  </div>
                  <div className="totald">
                    <label>Total Day</label>
                    <input onChange={(e)=>setday(e.target.value)} defaultValue={props.content.tday} type="number" />
                  </div>
                 
                  <button onClick={update} type="submit" className="btn btn-primary">Submit</button>
                </form>
          </div>
          <div className="detail">
            <div className="dates">
              <div className="ditem">
                {info}
              </div>
              <div className="ditem">
                {date}
              </div>
              <button ><FontAwesomeIcon icon={faXmark} /></button>
            </div>
          </div>
        </div>
    </>
  )
}

export default EditAttendance