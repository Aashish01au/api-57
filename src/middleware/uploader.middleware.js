const multer = require("multer")
const fs = require("fs")
const myStroage= multer.diskStorage({
    destination:(req,file,cb)=>{
        try {
            let path = "./public/uploaders/"
            if(!fs.existsSync(path)){
                fs.mkdirSync(path,{
                    recursive:true
                })
            }
            cb(null,path)
        } catch (exception) {
            throw exception
        }
    },
    filename:(req,file,cb)=>{
        let ext = file.originalname.split(".").pop()
        let name = Date.now()+ext
        cb(null,name)
    }
})

const imageFilter = (req,file,cb)=>{
    let allowed = ["jpg","png","jpeg","svg","bmp","gif","webp"]
    let ext = file.originalname.split(".").pop()
    if(allowed.includes(ext.toLowerCase())){
        cb(null,true)
    }else{
        cb({code:403, message:"File Type Not Supported"},null)
    }
}
const uploader = multer({
    storage:myStroage,
    fileFilter:imageFilter,
    limits:{
        fileSize:3000000
    }
})
module.exports = uploader