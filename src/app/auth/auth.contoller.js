const mailSvc = require("../../services/mail.services")
const AuthRequest = require("./auth.request")
const authSvc = require("./auth.services")
const bcrypt = require("bcryptjs")

class AuthController{
     async register(req,res,next){
        try {
            let mapped = new AuthRequest(req).transformRegisterData()
            let userDetails = await authSvc.storeBanner(mapped)
            //await mailSvc.sendEmail(mapped.email,"Regoister User",`<b>Hello ${mapped.name}?</b>`)
            res.json({
                result:userDetails,
                message:"User register Page"
            })
        } catch (exception) {
            
         next(exception)   
        }
    }
    async activateUser(req,res,next){
        try {
            let token = req.params.token
            let userDetails = await authSvc.getUserByFilter({
                token:token
            })
            if(!userDetails){
                next({code:404, message:"USer DOes not exist.."})
            }else{
                let password = bcrypt.hashSync(req.body.password,10)
                let user = await authSvc.updateUser(userDetails[0],{
                    password:password,
                    token:null,
                    status:"active"
                })
                res.json({
                    result:user,
                    message:"USer Actiavted Successfully",
                    meta :null
                })

            }
        } catch (exception) {
            next(exception)
        }
    }
    async forgetPasssword(req,res,next){
        try {
            res.json({
                result:null,
                message:"Check ur email to reset ur password",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
}

const authCtrl = new AuthController()
module.exports = authCtrl