import axios from "axios"
import {useState} from "react"
import Alert from "./Alert"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../Redux_store/Auth"
import {comp} from "../Redux_store/Comp"

const Login = (props) => {

    const dispatch = useDispatch();
    const comp1 = useSelector((state)=>state.comp.comp)
    // console("i am in login : " , comp)

    const [email , setemail] = useState()
    const [password , setpass] = useState()
    const [alert , setalert] = useState(false)
    
    const gotosignup = ()=> {
        dispatch(comp("signup"))
    }

    const loginuser = async (e) => {
        try {
                e.preventDefault();
            const response = await axios.post("http://localhost:5000/api/login",{
                email,
                password    
            },
            {withCredentials:true})
            
            if(response.status === 200){
                dispatch(login(response.data))
                dispatch(comp("."))
            }
            else{   
                console.log("Something Error ocurred in server");
            }
            
        } catch (error) {  
            setalert(true) 
            setTimeout(() => {
                setalert(false)    
            }, 1500); 
            console.log("Something went wrong : " , error.message)
        }
    }

  return (
    
    <>
    {comp1 === "signin" && 
    <div className="page">
        <div className="register">
                <h1 className=  "text" style={{textAlign:"center" , fontSize:"35px"}}>Sign in</h1>
                <hr></hr>
                <form onSubmit={loginuser}>
                {alert && <Alert message={"Invalid Credantials"}/>}

                    <div className="form-item email">
                        <label className="text">Email address</label>
                        <input onChange={(e) => {setemail(e.target.value)}} type="email"/>
                    </div>

                    <div className="form-item password">
                        <label className="text">Password</label>
                        <input onChange={(e) => {setpass(e.target.value)}} type="password"/>
                    </div>

                    <button className="btn1 text my-4" type="submit">Log in</button>

                 </form>
                    <div className="go_signup">
                        <h6 style={{fontSize:"13px" , marginTop:"2px"}}>Don't have an account?</h6>
                        <p style={{textDecoration:"none",fontSize:"13px",color:"blue",cursor:"pointer"}} onClick={gotosignup}>create one</p>
                    </div>
        </div>
    </div>
    }
    </>
    
  )
}

export default Login;