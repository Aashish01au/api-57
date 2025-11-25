const {z} = require("zod")
let registerUserSchema = z.object({
    name:z.string().min(3),
    email:z.string().email(),
    address : z.string(),
    phone:z.string(),
    role:z.string().regex(/seller|admin|customer/)
})

module.exports ={
    registerUserSchema
}