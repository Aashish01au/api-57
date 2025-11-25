const BannerModel = require("./auth.model")
class AuthServices{
    async storeBanner(data){
        try {
            let user = new BannerModel(data)
            return await user.save()
        } catch (exception) {
            throw exception
        }
    }
}
const authSvc = new AuthServices()
module.exports = authSvc
