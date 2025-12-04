const {z}= require("zod")
let createBannerSchema = z.object({
    title:z.string().min(3).nonempty(),
    link:z.string().nonempty(),
    position:z.string().regex(/\d/).nonempty(),
    status:z.string().regex(/active|inactive/).nonempty()
})
let updateBannerSchema = z.object({
    title:z.string().min(3).nonempty(),
    link:z.string().nonempty(),
    position:z.string().regex(/\d/).nonempty(),
    status:z.string().regex(/active|inactive/).nonempty()
})

module.exports = {
    createBannerSchema,
    updateBannerSchema
}