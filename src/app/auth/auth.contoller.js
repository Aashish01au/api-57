const generateRandomString = require("../../helpers/helpers")
const mailSvc = require("../../services/mail.services")
const AuthRequest = require("./auth.request")
const authSvc = require("./auth.services")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

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
            let email= req.body.email
            console.log(email)
            let userdetails = await authSvc.getUserByFilter({
                email:email
            })

            if(userdetails.length !==1){
                next({code:401,message:"User does not exist"})
            }else{
               let user=userdetails[0]
                user.forgetToken=generateRandomString()
                let date = new Date()
                date.setUTCHours(date.getUTCHours()+2)
                user.validatedTill=date
                 user.save()
                let message = authSvc.getResetMessage(user.name,user.forgetToken)
              await mailSvc.sendEmail(user.email,"Reset Password message",message)
            }
            res.json({
                result:{
                    details:user
                },
                message:"Check ur email to reset ur password",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
    async loginUser(req,res,next){
        try {
            let credentilas = req.body

            let userdetails = await authSvc.getUserByFilter({
                email:credentilas.email
            })

            if(userdetails.length !==1){
                next({code:403, message:"User Does noot existt"})
            }else{
                if(!bcrypt.compareSync(credentilas.password,userdetails[0].password)){
                    next({code:401, message:"Credentials does not match"})
                }else{
                        let token = jwt.sign( {data:userdetails[0]},process.env.JWT_SECRET,{
                        expiresIn:"1h"
                    })
                        let refreshtoken = jwt.sign( {data:userdetails[0]},process.env.JWT_SECRET,{
                        expiresIn:"1d"
                    })
                    res.json({
                        result:{
                            token:token,
                            refreshtoken:refreshtoken,
                            user:userdetails[0]
                        },
                        message:"Login Successfully",
                        meta:null
                    })
                    
                }
            }

           
        } catch (exception) {
            next(exception)
        }
    }
    async profile(req,res,next){
        try {
            let user = req.authUser
            res.json({
                result:user,
                message:"User Profile",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
    async resetPassword(req,res,next){
        try {
            let token = req.params.token

            let userDetails = await authSvc.getUserByFilter({
                forgetToken:token,
                validatedTill:{$gte:Date.now()+2}
            })
           
            if(!userDetails){
                next({code:404, message:"USer DOes not exist.."})
            }else{
                let password = bcrypt.hashSync(req.body.password,10)
                let user = await authSvc.updateUser(userDetails[0],{
                    password:password,
                    forgetToken:null,
                    validatedTill:null
                })
                console.log(user)
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
}

const authCtrl = new AuthController()
module.exports = authCtrl