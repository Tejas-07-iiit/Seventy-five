import { useSelector } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"
import Alert from "./Alert"

const Subject = () => {

    const [alert , setalert] = useState(false)

    const [sname , setname] = useState()
    const [scode , setcode] = useState()
    const [credit , setcredit] = useState()
    const [facultyname , setfname] = useState()

    const [modal , setmodal] = useState(false)
    const [sub , setsub] = useState()
    const component = useSelector((state) => state.comp.comp)

    const cancel = () => {
        setmodal(false)
    }
    const isrequired = async () => {
        if(!sname || !scode || !credit || !facultyname){
            setalert(true);
            setTimeout(() => {
                setalert(false)
            }, 1500);
            return false;
        }
        else {
            return true;
        }
    }
    const add = async (e) => {
        e.preventDefault()
        
        try { 
            if(await isrequired()) {
                const addsubject = await axios.post("http://localhost:5000/api/addsubject",{ 
                    sname,
                    scode,
                    credit,
                    facultyname
                },{
                    withCredentials: true
                })
                if(addsubject.status === 200){
                    console.log("Subject added successfully")
                }
                setmodal(false)
        }
        } catch (error) {
            console.log("Not able to add subject : " , error.message)
        }
    }

    const show = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/allsubject",
                {},
                {
                    withCredentials:true
                })
                console.log(response.data)
                if(response.status === 200){
                    setsub(response.data)
                }
                else {
                    console.log("Some Error ocurred")
                }
        } catch (error) {
            console.log("Not able to fetch Subjects : " , error.message)
        }
    } 
    
   const dlt = async (scode) => {
    try {
        const dresponse = await axios.delete(
            "http://localhost:5000/api/dsubject",
            {
                data: { scode },   
                withCredentials: true
            }
        );
        if (dresponse.status === 200) {
            console.log("Subject Deleted");
        }
    } catch (error) {
        console.log("Something Went Wrong:", error);
    }
};


    useEffect(()=>{
        show()
    },[modal])

  return (
    <>
        {
            component === "addsubject" && 
            <div className="subject">
                <div className="heading">
                    Subjects
                </div>
                <pre className="line"> </pre>
                <div className="allsubject">
                    {
                    sub.map((item) =>
                        <div key={item._id} className="subjectCard">
                            <div className="Cardt">
                                {`${item.sname}`}
                            </div>
                            <div className="Cardt credit">
                                code : {`${item.scode}`}
                            </div>
                            <div className="credit">
                                credit : {`${item.credit}`}
                            </div>
                            <div className="facultyname">
                                Faculty : {`${item.facultyname}`} 
                            </div>
                            <div className="delete">
                                <button onClick={()=>dlt(scode)}>Delte</button>
                            </div>
                        </div>
                        )
                    }

            </div>
            <div className="btnbox">
                <button onClick={() => setmodal(true)} className="btn2">&#43; Add Subject</button>    
            </div>
                <div className="add-subject-container">

                    <p className="description">
                        Easily manage academic subjects by adding all essential details in one place.
                        This feature helps maintain accurate records and smooth coordination.
                    </p>

                    <h3>Subject Details</h3>
                    <ul>
                        <li><strong>Subject Name:</strong> Enter the official name of the subject.</li>
                        <li><strong>Subject Code:</strong> Add a unique code for identification.</li>
                        <li><strong>Credits:</strong> Specify the academic credit value.</li>
                        <li><strong>Faculty Name:</strong> Enter the assigned faculty member.</li>
                    </ul>

                    <p className="note">
                        Once submitted, the subject will be added to the system for tracking and academic planning.
                    </p>
                </div>

                    {modal &&
                        <form className="modal_pop">
                            <div className="formItem title">
                                Subject Detail
                            </div>
                            {alert && <Alert message={"All fields are required"}/>} 
                            <div className="formItem">
                                <label className="name">Subject Name</label>
                                <input onChange={(e) => setname(e.target.value)} type="name"/>
                            </div>
                            <div className="formItem">
                                <label className="name">Subject Code</label>
                                <input onChange={(e)=> {setcode(e.target.value)}} type="name"/>
                            </div>
                            <div className="formItem">
                                <label className="name">Credit</label>
                                <input onChange={(e)=> {setcredit(e.target.value)}} type="name"/>
                            </div>
                            <div className="formItem">
                                <label className="name">Faculty Name</label>
                                <input onChange={(e)=> {setfname(e.target.value)}} type="name"/>
                            </div>
                            <div className="btns">
                                <button onClick={add} type="submit" className="btn3">Add</button>
                                <button onClick={cancel} type="submit" className="btn3">Cancel</button>
                            </div>
                        </form>
                        }
                </div> 
        }
    </>
  )
}

export default Subject;