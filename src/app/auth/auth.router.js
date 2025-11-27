const uploader = require("../../middleware/uploader.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const authCtrl = require("./auth.contoller")
const { registerUserSchema, activateUserSchema, forgetPasswordSchema } = require("./auth.validator")

const authRouter= require("express").Router()

authRouter.post("/register",uploader.single("image"),validatedSchema(registerUserSchema),authCtrl.register)
authRouter.post("/activate/:token",validatedSchema(activateUserSchema),authCtrl.activateUser)
authRouter.post("/forget-password",validatedSchema(forgetPasswordSchema),authCtrl.forgetPasssword)


module.exports = authRouter