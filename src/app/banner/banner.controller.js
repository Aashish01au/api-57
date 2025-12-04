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
}
const bannerCtrl = new BannerControler()
module.exports = bannerCtrl