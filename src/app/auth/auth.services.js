const UserModel = require("./auth.model")
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

    async getUserByFilter(data){
        try {
            let user = await UserModel.find(data)
            return user
        } catch (exception) {
            throw exception
        }
    }

    async updateUser(id,data){
        try {
            let user = await UserModel.findByIdAndUpdate(id,data)
            return user
        } catch (exception) {
            throw exception
        }
    }
}
const authSvc = new AuthServices()
module.exports = authSvc
