const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        min:3,
        require:true
    },
    email : {
        type: String,
        require:true
    },
    address:{
        type : String,
        require: true
    },
    phone:{
        type: String,
         require: true
    },
    role:{
        type : String,
        enum:["admin","seller","customer"],
        default:"customer",
        require: true
    },
    status:{
         type : String,
         enum:["active","inactive"],
         default:"inactive",
         require:true
    },
    image:String,
    token:String,
    forgetToken:String,
    password: String,
    validatedTill :Date
},
{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})

const UserModel = mongoose.model("User",UserSchema)
module.exports = UserModel