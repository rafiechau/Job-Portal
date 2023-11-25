const { User } = require("../models");
const { userSchema, loginSchema } = require("../helper/validateAtributes");
const { hashPassword, comparePassword } = require("../utils/bycrpt");
const { generateToken } = require("../utils/jwt");

exports.registerUser = async(req, res) => {
    try{
        const { name, email, password, role} = req.body

        const { error } = userSchema.validate({ name, email, password, role})

        if(error){
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: 'Pendaftaran Berhasil', data: newUser });
    }catch(error){
        res.status(500).json({ message: 'Internal server error: ' + error });
    }
}

exports.loginUser = async (req, res) => {
    try{
        const { email, password } = req.body

        const { error } = loginSchema.validate({email, password})

        if(error){
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await User.findOne({where: { email }});
        if(!user){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken({ id: user.id, role: user.role })

        res.status(200).send({ message: 'Login successful', token });
    }catch(error){
        res.status(500).json({ message: 'Internal server error: ' + error });
    }
}

exports.getAllUsers = async(req, res) => {
    try{
        if (req.user.role !== 1) {
            return res.status(403).json({ message: 'Akses ditolak. Hanya untuk Admin.' });
        }

        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({message: "success", users});
    }catch(error){
        res.status(500).json({ message: 'Internal server error: ' + error });
    }
}