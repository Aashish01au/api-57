const checkLoggin = require("../../middleware/auth.middleware")
const checkPermission = require("../../middleware/rbac.middleware")
const uploader = require("../../middleware/uploader.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const authCtrl = require("./auth.contoller")
const { registerUserSchema, activateUserSchema, forgetPasswordSchema, resetUserSchema, loginSchema } = require("./auth.validator")

const authRouter= require("express").Router()

authRouter.post("/register",uploader.single("image"),validatedSchema(registerUserSchema),authCtrl.register)
authRouter.post("/activate/:token",validatedSchema(activateUserSchema),authCtrl.activateUser)
authRouter.post("/forget-password",validatedSchema(forgetPasswordSchema),authCtrl.forgetPasssword)
authRouter.post("/reset-password/:token",validatedSchema(resetUserSchema),authCtrl.resetPassword)
authRouter.post("/login",validatedSchema(loginSchema),authCtrl.loginUser)
authRouter.get("/me",checkLoggin,checkPermission("admin"),authCtrl.profile)

module.exports = authRouter