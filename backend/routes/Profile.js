const express = require("express")
const router = express.Router()
const usr = require("../models/user.model")
const Auth = require("../Middleware/Auth")

router.post("/prrofile" , Auth ,async (req,res)=> {
    try {
        const response = await usr.findById(req.user.userId)
        // console.log(response)
        res.status(200).json(response)

    } catch (error) {
        console.log("somethning went wrong : " , error.message)
        res.status(401).json()
    }
})

module.exports = router