const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const token = req.cookies.authentic_Token;
    if(!token) return res.status(401).json('unauthorized')
    jwt.verify(token,process.env.JWT, (err,user)=>{
if(err) return res.status(401).json('forbidden')

req.user = user;
next()
}
    )
}

module.exports = { verifyToken }