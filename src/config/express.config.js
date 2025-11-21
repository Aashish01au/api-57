const express = require("express")
const { ZodError } = require("zod")
const routes = require("../routes")
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

require("./mongodb.config")
app.use("/api/v1",routes)
app.use((req,res,next)=>{
    next({code:404, message:"Page not found"})
})

app.use((error,req,res,next)=>{
    console.log(error)
    let code = error.code || 500
    let message = error.message || "Internal Server Error"

 
    res.status(code).json({
        result:null,
        message:message,
        meta : null
    })
})

module.exports = app