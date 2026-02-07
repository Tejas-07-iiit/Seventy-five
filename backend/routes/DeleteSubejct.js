const express =  require("express")
const Subject = require("../models/subject.model")
const Auth = require("../Middleware/Auth")
const router = express.Router()
const Attendance = require("../models/Attendance.model")


router.delete("/dsubject" , Auth ,async (req,res)=>{
    try {
        const scode = req.body.scode;
        console.log(req.user)
        const s1  = await Subject.findOne({scode:scode, userid : req.user.userId}) 
        console.log(s1)
        const atd = await Attendance.deleteOne({scode : s1._id , userid : req.user.userId});
        const s2 = await Subject.deleteOne({scode : scode});
        // console.log(atd)
        

        if(s1 && s2){
            res.status(200).json({message : "Subject Deleted successfully"})
        }

    } catch (error) {
        console.log("Something Went wrong 1 : ", error.message)
    }
})

module.exports = router;