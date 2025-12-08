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

    async findUserByFilter(filter={}){
        try {
            let user = await UserModel.find(filter)
            return user
        } catch (exception) {
            throw exception
        }
    }

    async getUserById(id){
        try {
            let user = await UserModel.findById(id)
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

    async getResetMessage(name,forgetToken){
        try {
            return `
            <h1>Dear ${name}</h1><br>
            <h1>ur reset password token is ${forgetToken}</h1><br>
            <h1>Thank you</h1>
            `
        } catch (exception) {
            throw exception
        }
    }
}
const authSvc = new AuthServices()
module.exports = authSvc
