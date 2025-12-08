const checkPermission = (checkRole)=>{
   try {
    return (req,res,next)=>{
        let user = req.authUser
        
        if(typeof checkRole=="string" && user.role.toLowerCase()!== checkRole.toLowerCase()){
            next({code:403, message:"You do not have previlliage to access the system"})
        }else if(typeof checkRole =="object" && !(checkRole.includes(user.role()))){
            next({code:403, message:"You do not have previlliage to access the system.."})
        }else{
            next()
        }
    }
   } catch (exception) {
    throw exception
   }
}

module.exports = checkPermission