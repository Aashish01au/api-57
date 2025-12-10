const checkLoggin = require("../../middleware/auth.middleware")
const checkPermission = require("../../middleware/rbac.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const bannerCtrl = require("./banner.controller")
const { createBannerSchema } = require("./banner.validator")

const bannerRouter = require("express").Router()

bannerRouter.route("/")
    .post(checkLoggin,checkPermission("admin"),validatedSchema(createBannerSchema),bannerCtrl.createBanner)
    .get(checkLoggin,checkPermission("admin"),bannerCtrl.getAllBannerDetails)
bannerRouter.route("/:id")
    .get(checkLoggin,checkPermission("admin"),bannerCtrl.getBannerDetailById)

module.exports = bannerRouter