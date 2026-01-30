const express = require("express")
const connect = require("../config/db")
const User = require("../models/user.model")
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")

const cookieParser = require("cookie-parser");
// const { useRef } = require("react");
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000", 
  credentials: true
}));
require("dotenv").config();

app.use(express.json())
// connect With MongoDb
connect();

// End Point -> Register
app.post("/register", async (req,res) => {
    try {
        res.json({
            name : req.body.name
        })

        const newuser = new User({
            f_name : req.body.f_name,
            l_name : req.body.l_name,
            email : req.body.email,
            password : req.body.password
        })
        
        await newuser.save()
    } catch (error) {
        res.send(601)
        console.log("Something went wrong : " , error.message)
    }
})

// End Point -> Login
app.post("/login" , async (req,res)=>{
    
    try {
        const loginuser = await User.findOne({email:req.body.email})
        // Access Token 
        
        if (loginuser && (req.body.password === loginuser.password)) {
            const accessToken = jwt.sign(
           {
               userId: loginuser._id,
               email: loginuser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30m"
            }
        );
        //    console.log(accessToken)
        res.cookie("token", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });
        
        res.status(200).send(loginuser);
        
        console.log("User succesfully logged in");
    }
    
    else {
        console.log("Invalid Credentials")
        res.status(401)
        res.send()
    }
    
} catch (error) {
    console.log("Failed to login : ", error.message)
    }
})
let count = 0;
app.post("/refresh", (req, res) => {    
    
    try {
        const token = req.cookies.token; 
        
        if (!token && count != 0) {
            count += 1;
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        const dc = jwt.verify(token, process.env.JWT_SECRET);
        
        return res.status(200).json({dc});
        
    }
    catch (error) {
        if(count !== 0){
            console.log("something went wrong : " , error.message)
            return res.status(401).json({ message: "Invalid token" });
        }
    }
});


// App listen port
app.listen(process.env.PORT , ()=>{
    console.log(`Your Server Is running on port ${process.env.PORT}`)
})