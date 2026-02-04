import axios from "axios"
import comp from "../Redux_store/Comp"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const Attendance = () => {

    const component = useSelector((state)=>state.comp.comp)

    const [subject,setsub] = useState();
    const [reload , setload] = useState(false);
    const [percent , setpercent] = useState();
    const [present,setpresent] = useState();
    const [absent , setabsent] = useState();
    const [att , setatt] = useState(null);

    
    useEffect(()=>{
      if(att) {
        console.log(att)
      }
    },[att])  
    
    
    // This Function Fetch All attendence
    const atd = async () => {
      try {
        const adnc = await axios.post("http://localhost:5000/api/allAttendance" ,{} , {
          withCredentials : true
        })
        if(adnc.status === 200){
          setatt(adnc.data)
        }

      } catch (error) {
        console.log(error.message)
      }
    }

    
    // This Function Fetch All subject
    const sub = async () => {
      try {
        const sbj = await axios.post("http://localhost:5000/api/allsubject",{},{
          withCredentials : true
        })
        if(sbj.status === 200) {
          setsub(sbj.data)
        }
      } catch (error) {
        console.log("Something Went Wrong : " , error.message)
      }
       if(!reload) {
        setload(true)
      }
      else {
       setload(false) 
      }
    }

    useEffect(()=> {
      sub()
    },[reload])

    // This function Can Update All Attendance
    const updateAttendance =async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/Attendance" , {
          
        } ,{
          withCredentials : true
        })
        
      } catch (error) {
        console.log("Something Went Wrong : ", error.message)
      }
    }

  return (
    <>
    {
      component === "Attendance" && 

        <div className="attendance">

            <div className="pannel_title">
                My Attendance
            </div>

            <pre className="line" style={{marginTop:"24px"}}></pre>
            {/* {
              subject.map((item) =>  */}

              <div className="AttCard">
                <div className="sname">
                  {/* {item.sname} */}
                </div>
                <div className="facultyname">
                  {/* {item.facultyname} */}
                </div>
                <div className="percent">
                  {percent}
                </div>
                <div className="pbtn">
                  <button onClick={atd}>Present</button>
                </div>
                <div className="abtn">
                  <button>Absent</button>
                </div>
              </div>

            {/* )} */}
        </div>
    }
    </>
  )
}

export default Attendance
