const express = require("express")
const Auth = require("../Middleware/Auth")
const router = express.Router();

const Subject = require("../models/subject.model")

router.post("/allsubject",Auth,async (req,res)=>{
    try {
        
        const Subjects = await Subject.find({userid : req.user.userId})
        // console.log(Subjects)
        res.status(200).json(Subjects)

    } catch (error) {
        console.log("Something Went Wrong : " , error.message)
        res.status(500).json({message : "Try after few hours"})
    }
})

module.exports = router;