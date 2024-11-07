const bycrypt = require('bcryptjs');

const User = require('../model/user.model');
const {
    serverErrorMessage,
    badRequestMessage,
} = require('../middleware/error.messages.middleware');
const { signupValidation, loginValidation } = require('../util/user.validation');
const { generateToken } = require('../middleware/auth.token');

exports.signup = async (req, res) => {
    try{
        const { value, error } = signupValidation(req.body);
        if(error) return badRequestMessage(error.details[0].message, res);

        const emailExist = await User.findOne({ email: value.email });
        if(emailExist) return badRequestMessage('Email already exists', res);

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(value.password, salt);

        const user = await User.create({
            username: value.username,
            email: value.email,
            password: hashedPassword
        });

        const token = await generateToken(user._id, res);
        return res.status(201).json({
            status: 'success',
            code: 201,
            token,
            data: {
                user
            }
        })

    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.login = async (req, res) => {
    try{
        const { value, error } = loginValidation(req.body);
        if(error) return badRequestMessage(error.details[0].message, res);

        const user = await User.findOne({ email: value.email });
        if(!user) return badRequestMessage('Invalid email or password', res);

        const validPass = await bycrypt.compare(value.password, user.password);
        if(!validPass) return badRequestMessage('Invalid email or password', res);

        const token = await generateToken(user._id, res);
        return res.status(200).json({
            status: 'success',
            code: 200,
            message:"login successfully",
            token,
            data: {
                user
            }
        });

    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.logout = async (req, res) => {
    try{
        res.clearCookie('jwt');
        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'logout successfully'
        });
    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};