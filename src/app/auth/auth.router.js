const uploader = require("../../middleware/uploader.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const authCtrl = require("./auth.contoller")
const { registerUserSchema } = require("./auth.validator")

const authRouter= require("express").Router()

authRouter.post("/register",uploader.single("image"),validatedSchema(registerUserSchema),authCtrl.register)

module.exports = authRouter