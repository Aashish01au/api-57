const AuthRequest = require("./auth.request")
const authSvc = require("./auth.services")

class AuthController{
     async register(req,res,next){
        try {
            let mapped = new AuthRequest(req).transformRegisterData()
            let userDetails = await authSvc.storeBanner(mapped)
            res.json({
                result:userDetails,
                message:"User register Page"
            })
        } catch (exception) {
            
         next(exception)   
        }
    }
}

const authCtrl = new AuthController()
module.exports = authCtrl