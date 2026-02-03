const express =  require("express")
const Subject = require("../models/subject.model")
const Auth = require("../Middleware/Auth")
const router = express()


router.delete("/dsubject" , Auth ,async (req,res)=>{
    try {
        const scode = req.body.scode;
        const response = await Subject.deleteOne({scode : scode});
        if(response){
        res.status(200).json({message : "Subject Deleted successfully"})
        // console.log("asdknsldfkasndfsn")
        }

    } catch (error) {
        console.log("Something Went wrong 1 : ", error.message)
    }
})

module.exports = router;