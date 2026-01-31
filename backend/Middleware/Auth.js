const jwt = require("jsonwebtoken");

const Auth = (req,res,next) => {
    
    const accesstoken = req.cookies.token;
    // console.log(accesstoken)
    if(!accesstoken) {
        return res.status(401).send("Unautharized");
    }

    try {
        const dc = jwt.verify(accesstoken , process.env.JWT_SECRET)
        req.user = dc;
        next();
    } catch (error) {
        console.log("Unautharized account")
    }
}

module.exports = Auth;