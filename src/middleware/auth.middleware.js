const jwt = require("jsonwebtoken")
require("dotenv").config()
const checkLoggin = (req,res,next)=>{
    try {
        let token = null

        if(req.query["token"]){
            token = req.query["token"]
        }

        if(req.headers["authorization"]){
            token = req.headers["authorization"]
        }

        if(!token){
            next({code:403, message:"Token is requiredd"})
        }else{
            token= token.split(" ").pop()
           let  data = jwt.verify(token,process.env.JWT_SECRET)
           if(!token){
            next({code:403, message:"token does not set , empty or null"})
           }else{
            if(!data.hasOwnProperty("_id")){
                next({code:401, message:"User does not exist"})
            }else{
            let user = data
            }
           }
        }
    } catch (exception) {
        next(exception)
    }
}

module.exports = checkLoggin