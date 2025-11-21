class AuthController{
    register(req,res,next){
        try {
            let data= req.body
            res.json({
                result:data,
                message:"User register Page"
            })
        } catch (exception) {
         next(exception)   
        }
    }
}

const authCtrl = new AuthController()
module.exports = authCtrl