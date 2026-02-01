import { useSelector } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"

const Subject = () => {
    const [modal , setmodal] = useState(false)
    const [sub , setsub] = useState()
    const component = useSelector((state) => state.comp.comp)

    const add = async (e) => {
        e.preventDefault();
        try {
            const addsubject = await axios.post("http://localhost:5000/api/addsubject",{ 

             },{
                withCredentials: true
            })
            if(addsubject.status === 200){
                console.log("Subject added successfully")
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

    useEffect(()=>{
        show()
    },[])

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
                            <div className="credit">
                                credit : {`${item.credit}`}
                            </div>
                            <div className="facultyname">
                                Faculty : {`${item.facultyname}`} 
                            </div>
                        </div>
                        )
                    }

                <button onClick={() => setmodal(true)} className="btn2">&#43; Add Subject</button>    
            </div>

                    {modal &&
                        <form className="modal_pop">
                            <div className="formItem title">
                                Subject Detail
                            </div>
                            <div className="formItem">
                                <label className="name">Subject Name</label>
                                <input type="name"/>
                            </div>
                            <div className="formItem">
                                <label className="name">Subject Code</label>
                                <input type="name"/>
                            </div>
                            <div className="formItem">
                                <label className="name">Credit</label>
                                <input type="name"/>
                            </div>
                            <div className="formItem">
                                <label className="name">Faculty Name</label>
                                <input type="name"/>
                            </div>
                            <div className="btns">
                                <button onClick={add} type="submit" className="btn3">Add</button>
                                <button onClick={add} type="submit" className="btn3">Cancel</button>
                            </div>
                        </form>
                        }
                </div> 

                // </div>
        }
    </>
  )
}

export default Subject;