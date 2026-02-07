const express = require("express")
const router = express.Router()
const Attendance = require("../models/Attendance.model")
const Auth = require("../Middleware/Auth")

router.put("/editatt" , Auth , async (req,res) => {
    
    try {
        const data = req.body
        
        const response = await Attendance.updateOne({
            scode : data.scode,
            userid : req.user.userId
        } , {
            $set : {
                pday : data.pday,
                tday : data.tday,
                aday : data.aday
            }
        })
    
    if (response) {
        console.log("Attencance Edited Successfully")
    }

    res.status(200).json({message : "Edited Successfully" , ack : true})

    } catch (error) {
        console.log("Something Went Wrong : " ,  error.message)
        res.status(500).json({message : "Not Edited" , ack : false})
    }
})

module.exports = router;