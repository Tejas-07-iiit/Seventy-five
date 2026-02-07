const express = require("express")
const router = express.Router()
const Attendance = require("../models/Attendance.model")
const Subject = require("../models/subject.model")
const Auth = require("../Middleware/Auth")

router.post("/allAttendance" , Auth , async (req,res) => {
    try {

        // user id from middleware
        const userid = req.user.userId 

        // response from the database
        const response = await Attendance.find({userid : userid})

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json({message : "Try Again ...."})
        console.log("Something Went Wrong : ",error.message)
    }
})

module.exports = router