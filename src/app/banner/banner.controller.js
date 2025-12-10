const bannerSvc = require("./banner.services")

class BannerControler{
    async createBanner(req,res,next){
        try {
            let data = await bannerSvc.transformBannerData(req)
            let banner = await bannerSvc.storeBanner(data)
            res.json({
                result:banner,
                message:"Banner Created Successfully",
                meta: null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getAllBannerDetails(req,res,next){
        try {
            let search = req.query.search || null
            let limit = req.query.limit || 10
            let currentPage = req.query.page ? Number(req.query.page) :1
            let skip = (currentPage-1)*limit

            let filter = {}

            if(search){
                filter= {
                    ...filter,
                    $or:{
                        name:(RegExp(search,"i")),
                        title:(RegExp(search,"i")),
                        link:(RegExp(search,"i")),
                        status:(RegExp(search,"i"))
                    }
                }
            }

            let count = await bannerSvc.totalCount(filter)

            let bannersDetails = await bannerSvc.getAllBannerDetails(filter,{skip:skip,limit:limit,})
            res.json({
                result:bannersDetails,
                message:"Banner details Fetched Successfully...",
                meta:{
                    totalCounts : count,
                    page:currentPage,
                }
            })
        } catch (exception) {
            next(exception)
        }
    }
    async getBannerDetailById(req,res,next){
        try {
            let id = req.params.id
            let banner = await bannerSvc.getBannerById(id)
        } catch (exception) {
            next(exception)
        }
    }
}
const bannerCtrl = new BannerControler()
module.exports = bannerCtrl