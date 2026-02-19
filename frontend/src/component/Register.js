import { useState } from "react"
import Login from "./Login"
import axios from "axios"
import Alert from "./Alert"
import { useDispatch, useSelector } from "react-redux"
import {comp} from "../Redux_store/Comp"

const Register = () => {
    
    const [f_name , setfname] = useState();
    const [l_name , setlname] = useState();
    const [email , setemail] = useState();
    const [password , setpass] = useState();
    const [cpassword , setcpass] = useState();

    const comp1 = useSelector((state)=>state.comp.comp)
    const dispatch = useDispatch()

    const [alert , setalert] = useState(false)
    
    const isrequired = () => {
        if(!f_name || !l_name || !email || !password || !cpassword) {
            setalert(true)
            setTimeout(() => {
                setalert(false)
            }, 1300);
            return false;
        }
        return true;
    }

    const gotologin = () => {
        dispatch(comp("signin"))
    }

    const reset1 = () => {

        if(isrequired() && (password === cpassword)) {
            // console.log("HI")
            document.getElementById("regform").reset()
        }
    }

    const saveuser = async (e) => {
        e.preventDefault();
        try {
            if(isrequired() && (password === cpassword)) {
                await axios.post("http://localhost:5000/api/register", {
                    f_name,
                    l_name,
                    email,
                    password,
                })
            }
       
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
        {comp1 === "signup" &&
            <div className="page">

                <div className="register">
                        <h1 className=  "text" style={{textAlign:"center" , fontSize:"35px"}}>Sign Up</h1>
                        <hr></hr>
                        
                        <form id="regform" onSubmit={saveuser}>
                            {alert && <Alert message={"All fields are required"}/>}
                            <div className="form-item Name">
                                <label className="text">First Name</label>
                                <input onChange={(e)=>{setfname(e.target.value)}} type="fname"/>
                            </div>

                            <div className="form-item Name">
                                <label className="text">Last Name</label>
                                <input onChange={(e)=>{setlname(e.target.value)}} type="lname"/>
                            </div>

                            <div className="form-item email">
                                <label className="text">Email address</label>
                                <input onChange={(e)=>{setemail(e.target.value)}} type="email"/>
                                <div style={{fontSize:"10px",color:"rgb(171, 75, 75)"}}>We'll never share your email with anyone else.</div>
                            </div>

                            <div className="form-item password">
                                <label className="text">Password</label>
                                <input onChange={(e)=>{setpass(e.target.value)}} type="password"/>
                            </div>

                            <div className="form-item password">
                                <label className="text">Confirm Password</label>
                                <input onChange={(e)=>{setcpass(e.target.value)}} type="password"/>
                                {cpassword !== password  && <p style={{fontSize:"13px",color:"rgba(255, 0, 0, 0.57)"}}>password doesn't match</p>}
                            </div>

                            <button onClick={reset1} className="btn1 text my-4" type="submit">Submit</button>

                            <div className="go_login">
                                <h6 style={{fontSize:"13px" , marginTop:"2px"}}>already have an account?</h6>
                                <p style={{textDecoration:"none",fontSize:"13px",color:"blue",cursor:"pointer"}} onClick={gotologin}>sign in</p>
                            </div>
                        </form>
                </div>
            </div>
            }
        </>
    )
}

export default Register