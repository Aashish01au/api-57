const checkLoggin = require("../../middleware/auth.middleware")
const checkPermission = require("../../middleware/rbac.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const bannerCtrl = require("./banner.controller")
const { createBannerSchema } = require("./banner.validator")

const bannerRouter = require("express").Router()

bannerRouter.route("/")
    .post(checkLoggin,checkPermission("admin"),validatedSchema(createBannerSchema),bannerCtrl.createBanner)

module.exports = bannerRouter