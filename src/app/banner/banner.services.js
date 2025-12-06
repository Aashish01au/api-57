const BannerModel = require("./banner.model")

class BannerServices{
   async transformBannerData(req,isEdit=false){
        try {
            let banner = {
                ...req.body,
                createdBy:req.authUser._id
            }

            if(!req.file){
                next({code:403, message:"validation Failure",result:{image:"Image Is required.."}})
            }else if(req.file){
                banner["image"]= req.file.filename
            }

            return banner
        } catch (exception) {
            throw exception
        }
    }
    async storeBanner(data){
        try {
            let banner = new BannerModel(data)
            return await banner.save()
        } catch (exception) {
            throw exception
        }
    }

    async getBannerById(id){
        try {
            let banner = await  BannerModel.findById(id)
            return banner
        } catch (exception) {
            throw exception
        }
    }


}

const bannerSvc = new BannerServices()
module.exports = bannerSvc