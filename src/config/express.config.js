const express = require("express")
const routes = require("../routes")
const { ZodError } = require("zod")
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken")
const app = express()
require("./mongodb.config")
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
app.use("/api/v1",routes)
app.use((req,res,next)=>{
    next({code:404, message:"Page not found"})
})

app.use((error,req,res,next)=>{
    console.log(error)
    let code = error.code || 500
    let message = error.message || "Internal Server Error"

    if(error instanceof ZodError){
        let errorBag = {}
        error.issues.map((errorMsg)=>{
            errorBag[errorMsg.path[0]]=errorMsg.message
        })

        code =401, message= errorBag
    }
    if(error instanceof JsonWebTokenError || error instanceof TokenExpiredError){
        code=403, message= error.message
    }
    res.status(code).json({
        result:null,
        message:message,
        meta : null
    })
})

module.exports = app