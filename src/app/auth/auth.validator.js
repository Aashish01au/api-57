const {z} = require("zod")
let registerUserSchema=z.object({
    name:z.string().min().max(35).nonempty(),
    email:z.string().email().nonempty(),
    phone:z.string().nonempty(),
    address:z.string().nonempty(),
    role:z.string().regex(/admin|seller|customer/)
})
let uopdateUserSchema=z.object({
    name:z.string().min().max(35).nonempty(),
    email:z.string().email().nonempty(),
    phone:z.string().nonempty(),
    address:z.string().nonempty(),
    role:z.string().regex(/admin|seller|customer/)
})

module.exports = {
    registerUserSchema,
    uopdateUserSchema
}