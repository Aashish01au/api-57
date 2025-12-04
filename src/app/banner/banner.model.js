const mongoose = require("mongoose")
const BannerSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        min:3
    },
    image:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
    },
    position:{
        type:String,
        require:true,
        default:0
    },
    status:{
        type:String,
        enum:["active","inactive"],
        require:true,
        default:"inactive"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true,
        default:null
    }
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})

const BannerModel = mongoose.model("Banner",BannerSchema)
module.exports = BannerModel