const sharp = require("sharp")
const path = require("path")
const user = require("../models/user.model")

const upload = async (req , res) => {
    try {
        const uid = req.user.userId

        const opath = path.join(__dirname,"../uploads" , `${uid}.webp`)

        const response = await sharp(req.file.buffer).resize(300,300).webp({quality:80}).toFile(opath)
        console.log(opath)
        
        const imagePath = `/uploads/${uid}.webp`;

        await user.findByIdAndUpdate(uid , 
            {profileimage : imagePath}
        )

        res.status(200).json({
            message : "Image Uploaded",
            image : imagePath
        })

    } catch (error) {
        res.status(500)   
        console.log("something went wrong : " , error.message)
    }
}

module.exports = upload;