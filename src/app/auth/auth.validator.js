const {z} = require("zod")
let registerUserSchema = z.object({
    name:z.string().min(3),
    email:z.string().email(),
    address : z.string(),
    phone:z.string(),
    role:z.string().regex(/seller|admin|customer/)
})
let activateUserSchema=z.object({
    password:z.string().nonempty(),
    confirmPassword:z.string().nonempty()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})
let resetUserSchema=z.object({
    password:z.string().nonempty(),
    confirmPassword:z.string().nonempty()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})
let updateUserSchema = z.object({
    name:z.string().min(3),
    email:z.string().email(),
    address : z.string(),
    phone:z.string(),
    role:z.string().regex(/seller|admin|customer/)
})

let forgetPasswordSchema= z.object({
   email:z.string().email().nonempty()

})

module.exports ={
    registerUserSchema,
    activateUserSchema,
    updateUserSchema,
    resetUserSchema,
    forgetPasswordSchema
}