const express = require("express")
const Attendance = require("../models/Attendance.model")
const Auth = require("../Middleware/Auth")
const router = express.Router()
const Subject = require("../models/subject.model")

router.use(express.json())

router.post("/Attendance" , Auth , async (req,res)=>{
    try {
        const userid = req.user.userId 

        // console.log(userid)
        // console.log(req.body)
        const {scode , present , absent , date} = req.body;
        console.log(userid , date)

        const user = await Attendance.findOne({userid : userid , scode : scode});
        console.log(user)
        let pday = user.pday ; 
        let aday = user.aday ; 
        let tday = user.tday+1; 

        let ack;
        if(present){
            // console.log("i am in")
            pday += 1
            ack = await Attendance.updateOne(
                {_id : user._id}, 
                {
                    $set :{
                        pday : pday,
                        tday : tday
                },
                    $push : {
                        "Atime" : ["Present" , date]
                    }
                }
            )
            }
        
        if(absent) {
            aday += 1
            ack = await Attendance.updateOne(
                {_id : user._id} , 
                {
                    $set :{
                        aday : aday,
                        tday : tday 
                },
                    $push : {
                        Atime : ["Absent" , date]
                    }
                }
        )
        }
        // console.log(ack)
        if(ack.acknowledged){
            res.status(200).json({pday,aday,tday})
        }
        else {
            console.log("Please Try Again")
        }

    } catch (error) {
        res.status(500).json("Error")
        console.log("Something Went Wrong : " , error.message)
    }
})

module.exports = router;