const generateRandomString = require("../../helpers/helpers")

class AuthRequest{
    #data={}
    constructor(req){
        this.#data.body = req.body
        this.#data.file = req.file
    }
     transformRegisterData(){
        try {
        if(this.#data.file){
            this.#data.body.image = this.#data.file.filename
        }
        this.#data.body.token = generateRandomString()
        this.#data.body.status = "inactive"
        return this.#data.body
        } catch (exception) {
            throw exception
        }
    }
}

module.exports = AuthRequest