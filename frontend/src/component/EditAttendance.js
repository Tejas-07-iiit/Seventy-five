import axios, { all } from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setEdit } from "../Redux_store/Attedit"
import { reload } from "../Redux_store/Reload"
import { useEffect, useState } from "react"
import Alert from "./Alert"

const EditAttendance = (props) => {

  
  // console.log(props.content.Atime)
  const rel = useSelector((state)=>state.reload.reload)

  const dispatch = useDispatch()

  const [scode,setcode] = useState(props.content.scode)
  const [preday , setpreday] = useState(props.content.pday)
  const [today , setday] = useState(props.content.tday)
  const [alt , setalert] = useState(false)
  const [date , setdate] = useState()
  
  useEffect(()=> {
    console.log(props)
    document.getElementById("presentday").value = props.content.pday
    document.getElementById("totalday").value = props.content.tday
  } , [props])

  const update = async (e) => {
    e.preventDefault()

    // console.log(preday > today , preday , today)
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
                    <input id="presentday" onChange={(e)=>setpreday(e.target.value)} type="number"/>
                  </div>
                  <div className="totald">
                    <label>Total Day</label>
                    <input id="totalday" onChange={(e)=>setday(e.target.value)} type="number" />
                  </div>
                 
                  <button onClick={update} type="submit" className="btn btn-primary">Submit</button>
                </form>
          </div>
            <div className="detail">
                {
                props.content.Atime.map((item,index)=>(
                  <div key={index} className="dates">
                    <div className={item.att === "Present" ? "datt-g" : "datt-r"}>
                      {item.att}
                    </div>
                    <div className="ditem">
                      {item.date}
                    </div>
                    {/* <button ><FontAwesomeIcon icon={faXmark} /> </button> */}
                  </div>
                ))}
            </div>  
        </div>
    </>
  )
}

export default EditAttendance