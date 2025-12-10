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

    async getAllBannerDetails(filter={},paging={skip:0,limit:0}){
        try {
            let banners = await BannerModel.find({
                filter
            })
            .populate("createdBy",("id","role","name"))
            .sort({"_id":"desc"})
            .limit(paging.limit)
            .skip(paging.skip)

            return banners
        } catch (exception) {
            throw exception
        }
    }
    async totalCount(filter){
        try {
            return await BannerModel.countDocuments(filter)
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