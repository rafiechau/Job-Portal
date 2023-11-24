const Joi = require("joi");

exports.userSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.number().valid(2, 3).required()
})

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});


exports.jobSchema = Joi.object({
    Company: Joi.string().required(),
    Judul: Joi.string().required(),
    Deskripsi: Joi.string().required(),
    Lokasi: Joi.string().required(),
    TipePekerjaan: Joi.string().required(),
    Gaji: Joi.string().required(),
    Kategori: Joi.string().required(),
   
})